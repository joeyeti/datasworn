import { readJSON, writeJSON } from '../scripts/utils/readWrite.js'
import path from 'node:path'
import {
	WildcardString,
	PrefixSep,
	TypeSep,
	PathKeySep,
	GlobstarString,
	VERSION
} from '../scripts/const.js'
import { escapeRegExp } from 'lodash-es'
import Pattern from '../pkg-core/IdElements/Pattern.js'
import { ROOT_HISTORY } from '../scripts/const.js'
import { index } from '../tests/loadJson.js'
import { idReplacers } from './migrations.js'
import { CONST, TypeGuard } from '../pkg-core/IdElements/index.js'

const oldVersion = '0.0.10'

const idKeys = new Set(['_id', '$id'])

const idBlacklist = new Set([
	',',
	'. ',
	': ',
	'[',
	']',
	'(',
	')',
	'://',
	'.svg',
	'.webp'
])
const stringKeyBlacklist = new Set([
	'label',
	'name',
	'title',
	'text',
	'description',
	'summary',
	'_comment',
	'result',
	'url',
	'license',
	'icon'
])

function mightBeId(value: unknown) {
	if (typeof value !== 'string') return false
	if (!value.includes('/')) return false

	// check for character sequences that can occur only in markdown strings
	for (const char of idBlacklist) if (value.includes(char)) return false

	return true
}

export async function forEachIdInVersion(
	version: string,
	forEach: (id: string) => void
) {
	const dir = path.join(ROOT_HISTORY, version)
	const glob = '*/*.json'

	const files = new Bun.Glob(glob).scan({ cwd: dir, absolute: true })

	const readOps: Promise<unknown>[] = []

	for await (const file of files)
		readOps.push(
			readJSON(file, (k, v) => {
				if (idKeys.has(k) || (!stringKeyBlacklist.has(k) && mightBeId(v)))
					forEach(v as string)

				return v
			})
		)

	await Promise.all(readOps)
}

function getWildcardRegex(wildcardId: string) {
	if (!wildcardId.includes(WildcardString))
		// without any wildcards, there's not much to worry about. just escape it for use in the regex.
		return new RegExp(`^${escapeRegExp(wildcardId)}$`)

	const [fullTypeId, fullPath] = wildcardId.split(PrefixSep)
	const [primaryPath, ...embeddedKeys] = fullPath.split(TypeSep)
	const [rulesPackage, ...primaryPathKeys] = wildcardId.split(PathKeySep)

	const typePattern = fullTypeId.replaceAll(TypeSep, `\\${TypeSep}`)
	let pathPattern = ''

	switch (rulesPackage) {
		case GlobstarString:
			// exit early, since this can match anything of its type.
			// lazy way to trawl IDs that are already known to be valid. don't use for production.
			return new RegExp(
				`^${typePattern}${PrefixSep}${Pattern.RulesPackageElement.source}(?:/[a-z\\d_
        \\.]+)+$`
			)
		case WildcardString:
			pathPattern += Pattern.RulesPackageElement.source
			break
		default:
			pathPattern += rulesPackage
			break
	}

	for (const pathKey of primaryPathKeys) {
		switch (pathKey) {
			case GlobstarString:
				pathPattern += `(/${Pattern.DictKeyElement.source})*`
				break
			case WildcardString:
				pathPattern += `/${Pattern.DictKeyElement.source}`
				break
			default:
				pathPattern += `/${pathKey}`
				break
		}
	}

	for (const embeddedKey of embeddedKeys) {
		pathPattern += `\\${TypeSep}`
		switch (embeddedKey) {
			case WildcardString:
				pathPattern += `${Pattern.DictKeyElement.source}|\\d+`
				break
			default:
				pathPattern += embeddedKey
				break
		}
	}

	return new RegExp(`^${typePattern}${PrefixSep}${pathPattern}$`)
}

// console.log(getWildcardRegex('oracle_rollable:starforged/core/action'))

export async function generateIdMap(
	oldVersion: string,
	newVersion: string,
	replacers: Map<RegExp, string | null>
) {
	const currentIds = index
	const mappedIds = new Map<string, string | null>()
	const unmappedIds = new Set<string>()

	// console.log(replacementMap)

	await Promise.all([
		forEachIdInVersion(oldVersion, (id) => {
			// skip RulesPackageIds
			if (!id.includes('/')) return
			// skip ones that are already done
			if (mappedIds.has(id) || unmappedIds.has(id)) return
			for (const [pattern, replacer] of replacers) {
				const isMatch = pattern.test(id)
				if (!isMatch) continue
				if (replacer === null) return mappedIds.set(id, null)
				return mappedIds.set(id, id.replace(pattern, replacer))
			}

			return unmappedIds.add(id)
		})
	])

	if (unmappedIds.size > 0) {
		console.log(unmappedIds)
		throw new Error(
			`${unmappedIds.size} IDs from ${oldVersion} don't have a valid replacer. Change the regular expressions so that they can be matched to their equivalent in ${newVersion}, or explicitly assign them a null replacement (if no similarly-typed analogue exists).`
		)
	}

	// console.log(mappedIds)
	// if (unmappedIds.size > 0) console.log('unmappedIds', unmappedIds)

	const goodIds = new Map<string, string | null>()
	const badIds = new Map<string, string | null>()

	for (const [oldId, newId] of mappedIds) {
		switch (true) {
			case typeof newId === 'string' && currentIds.has(newId):
			case newId === null:
			case oldId.includes('*'):
			case newId?.includes('*'):
				goodIds.set(oldId, newId)
				break
			default:
				badIds.set(oldId, newId)
				break
		}
	}

	// console.log('GOOD IDS:', goodIds)
	if (badIds.size > 0) {
		console.log(badIds)
		throw new Error(
			`Got ${goodIds.size + badIds.size} replacement IDs, but ${badIds.size} have targets that don't exist.`
		)
	}

	return goodIds
}

// TODO: updater for ID wildcards?

const replacementMap = new Map(
	Object.entries(idReplacers).flatMap(([k, v]) =>
		v.map((e) => [e.oldId, e.newId] as [RegExp, string | null])
	)
	// .sort(orderReplacers)
) as Map<RegExp, string | null>

const masterMap = await generateIdMap(oldVersion, VERSION, replacementMap)

const rulesPackages = new Map<string, Record<string, string | null>>()

const commonIdMappings: Record<string, string | null> = {}

for (const [k, v] of masterMap) {
	const [rulesPkg, ..._tail] = k.split('/')
	if (TypeGuard.Wildcard(rulesPkg)) {
		commonIdMappings[k] = v
		continue
	}
	if (!rulesPackages.has(rulesPkg)) {
		rulesPackages.set(rulesPkg, { [k]: v })
		continue
	}
	const oldValue = rulesPackages.get(rulesPkg) as Record<string, string | null>
	const newValue = { ...oldValue, [k]: v }
	rulesPackages.set(rulesPkg, newValue)
}

// console.log(rulesPackages)

function sortByIdDepth(a: string, b: string): number {
	const typeDepthDifference =
		a.split(CONST.TypeSep).length - b.split(CONST.TypeSep).length
	if (typeDepthDifference !== 0) return typeDepthDifference

	const wildcardDifference =
		a.split(CONST.WildcardString).length - b.split(CONST.WildcardString).length

	if (wildcardDifference !== 0) return wildcardDifference

	const pathDepthDifference =
		a.split(CONST.PathKeySep).length - b.split(CONST.PathKeySep).length

	if (pathDepthDifference !== 0) return pathDepthDifference

	return a.localeCompare(b, 'en-US')
}

const writeOps: Promise<unknown>[] = []

for (const [pkgId, replacements] of rulesPackages) {
	if (TypeGuard.Wildcard(pkgId)) continue

	const sorted: Record<string, string | null> = {
		...Object.fromEntries(
			Object.entries({ ...replacements, ...commonIdMappings })
				.sort(([oldIdA, newIdA], [oldIdB, newIdB]) =>
					newIdA == null || newIdB == null
						? sortByIdDepth(oldIdA, oldIdB)
						: sortByIdDepth(newIdA, newIdB)
				)
				.reverse()
		)
	}
	const filePath = path.join(ROOT_HISTORY, VERSION, pkgId, 'id_map.json')
	writeOps.push(writeJSON(filePath, sorted))
}
