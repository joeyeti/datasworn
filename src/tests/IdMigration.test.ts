import { ROOT_HISTORY, VERSION } from '../scripts/const.js'
import { test, expect, describe } from 'bun:test'
import { loadDatasworn } from './loadJson.js'
import { readdir } from 'node:fs/promises'
import { Glob } from 'bun'
import path from 'node:path'

const versions = (await readdir(ROOT_HISTORY))
	.sort(Bun.semver.order)
	.filter((ver) => !/-[0-9]+$/.test(ver))

const previousVersion = versions.at(-2) as string
const currentVersion = versions.at(-1) as string

test(`History exists for current version (${VERSION})`, () =>
	expect(currentVersion).toBe(VERSION))

const [
	{ tree: previousTree, index: previousIndex },
	{ tree: currentTree, index: currentIndex },
	idMap
] = await Promise.all([
	loadDatasworn(previousVersion),
	loadDatasworn(currentVersion),
	loadIdMap(currentVersion)
])

const changedIds: [string, string | null | undefined][] = []

for (const oldId of previousIndex.keys()) {
	if (currentIndex.has(oldId)) continue
	changedIds.push([oldId, idMap[oldId]])
}

// console.log(changedIds)

describe('Changed ID has migration', () => {
	test.each(changedIds)('%p => %p', (oldId, mapping) => {
		expect(mapping).not.toBeUndefined()
	})
})

async function loadIdMap(version: string = VERSION) {
	const files = new Glob('**/*/id_map.json')
	const cwd = path.join(ROOT_HISTORY, version)
	const mergedMap: Record<string, null> = {}

	const ops: Promise<unknown>[] = []

	for await (const file of files.scan({ cwd, absolute: true }))
		ops.push(
			Bun.file(file)
				.json()
				.then((json) => Object.assign(mergedMap, json))
		)

	await Promise.all(ops)

	return mergedMap
}


