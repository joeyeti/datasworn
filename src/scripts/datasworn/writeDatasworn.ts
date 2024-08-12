import path from 'node:path'
import {
	RulesPackageBuilder,
	type IdRefTracker,
} from '../../pkg-core/Builders/RulesPackageBuilder.js'
import {
	IdParser,
	type Datasworn,
	type DataswornSource,
} from '../../pkg-core/index.js'
import type { RulesPackageConfig } from '../../schema/tools/build/index.js'
import { formatPath } from '../../utils.js'
import { DIR_HISTORY_CURRENT, ROOT_OUTPUT } from '../const.js'
import * as PkgConfig from '../pkg/pkgConfig.js'
import {
	loadDataswornSchema,
	loadDataswornSourceSchema,
} from '../schema/loadSchema.js'
import Log from '../utils/Log.js'
import { readJSON, readYAML, writeJSON } from '../utils/readWrite.js'
import AJV from '../validation/ajv.js'
import { idLike, needsIdValidation } from '../../pkg-core/Validators/Text.js'
import { sortJson } from '../../pkg-core/Utils/Sort.js'

Log.info('📖 Reading schema...')
// flush any old schema...
AJV.removeSchema()
// ...and load some fresh ones

const validators = Promise.all([
	loadDataswornSourceSchema(),
	loadDataswornSchema(),
])

await buildRulesPackages(PkgConfig)

async function buildRulesPackages(pkgs: Record<string, RulesPackageConfig>) {
	const profiler = Log.startTimer()

	Log.info('⚙️  Building rules packages...')

	const buildOps: Promise<RulesPackageBuilder>[] = []

	// indexes all package contents by their ID, so we can validate package links after they're built
	const index = new Map<string, unknown>()
	const unvalidatedRefs = new Set<string>()

	for (const k in pkgs) {
		const pkg = pkgs[k]

		buildOps.push(
			assemblePkgFiles(
				pkg,
				index,
				unvalidatedRefs,
				getSourceFiles(pkg.paths.source)
			)
		)
	}

	const errors: (Error | string)[] = []

	const writeOps: Promise<unknown>[] = []

	const builders = new Map<string, RulesPackageBuilder>()
	const tree = new Map<string, Datasworn.RulesPackage>()

	for (const builder of await Promise.all(buildOps)) {
		if (builder.errors.size)
			builder.errors.forEach(
				(k, v) => new Error(`Couldn't build file "${k}", ${v}`)
			)

		tree.set(builder.id, builder.build().toJSON())
		builders.set(builder.id, builder)
	}


	IdParser.tree = tree

	if (IdParser.tree == null)
		throw new Error("IdParser doesn't have default tree assigned")

	// now that we have all IDs available, we can validate the built packages

	const idTracker: IdRefTracker = {
		// any static ID that's been indexed must be a valid node
		valid: new Set(index.keys()),
		unreachable: new Set<string>(),
		invalid: new Set<string>(),
	}

	for (const ref of unvalidatedRefs)
		RulesPackageBuilder.validateIdRef(ref, idTracker, tree)

	for (const [pkgId, builder] of builders)
		try {
			// builder.validateIdRefs(idTracker, tree)

			const fileName = `${builder.id}.json`

			const writeDestinations = [
				path.join(ROOT_OUTPUT, pkgId, fileName),
				path.join(DIR_HISTORY_CURRENT, pkgId, fileName),
			]

			const json = builder.toJSON()

			writeOps.push(
				writeJSON(writeDestinations, json, {replacer: sortJson}).then(() => {
					Log.info(
						[
							`✏️  Wrote JSON for ${builder.packageType} "${builder.id}" to:`,
							...writeDestinations.map(formatPath),
						].join('\n  📝 ')
					)
				})
			)
		} catch (e) {
			errors.push(e as Error | string)
		}

	// TODO: make this report specific files where the bad ID exists
	// TODO: grab all ID refs when deserializing so the crawl operation only happens once

	for (const id of idTracker.invalid)
		errors.push(`Invalid or unparseable ID reference: <${id}>`)
	for (const id of idTracker.unreachable)
		errors.push(`Couldn't reach referenced ID: ${id}`)

	if (errors.length > 0)
		throw new Error(
			['Found invalid ID references:', ...errors.map((e) => e.toString())].join(
				'\n\t'
			)
		)

	await Promise.all(writeOps)

	profiler.done({
		message: `Finished building ${buildOps.length} rules package(s) in ${Date.now() - profiler.start.valueOf()}ms`,
	})
}

/** Loads files for a given Datasworn package configuration and assembles them with RulesPackageBuilder. */
async function assemblePkgFiles(
	{ id, paths, type }: RulesPackageConfig,
	masterIndex: Map<string, unknown>,
	idRefTracker: Set<string>,
	sourceFiles: AsyncIterableIterator<string>
) {
	const [sourceValidator, validator] = await validators

	if (!RulesPackageBuilder.isInitialized)
		RulesPackageBuilder.init({ sourceValidator, validator })

	const builder = new RulesPackageBuilder(id, Log)

	const builderOps: Promise<unknown>[] = []

	// begin loading and adding files
	for await (const filePath of sourceFiles) {
		Log.verbose(`📖 Reading ${formatPath(filePath)}...`)

		try {
			builderOps.push(_loadBuilderFile(filePath, builder, idRefTracker))
		} catch (error) {
			Log.error(error)
		}
	}

	Log.info(`🔍 Found ${builderOps.length} files for ${type} "${id}".`)

	await Promise.all(builderOps)

	Log.info(`⚙️  Assembling ${type} "${id}"...`)

	builder.build()

	for (const [k, v] of builder.index) masterIndex.set(k, v)

	Log.info(
		`✅ Assembled ${builder.index.size} identifiable nodes for ${builder.packageType} "${builder.id}" `
	)

	return builder
}

function trackIdRefs<T>(this: Set<string>, key: unknown, v: T): T {
	if (needsIdValidation(key, v)) {
		const ids = v.matchAll(idLike)

		if (ids != null) for (const match of ids) this.add(match[0])
	}

	return v
}

async function _loadBuilderFile<T extends DataswornSource.RulesPackage>(
	filePath: string,
	builder: RulesPackageBuilder,
	idRefTracker: Set<string>
) {
	const track = trackIdRefs.bind(idRefTracker)

	let data

	switch (path.extname(filePath)) {
		case '.yaml':
		case '.yml':
			{
				const yaml = await readYAML<T>(filePath)
				// yaml parsing creates anchors as references to the same object. pretty cool, but we need to edit them as unique instances.
				data = JSON.parse(JSON.stringify(yaml), track)
			}
			break
		case '.json':
			data = await readJSON<T>(filePath, track)
			break
		default:
			throw new Error(`Unrecognized file extension in "${filePath}"`)
	}

	return builder.addFiles({
		name: path.relative(process.cwd(), filePath),
		data,
	})
}

function getSourceFiles(path: string) {
	const glob = new Bun.Glob('**/*.{yaml,yml,json}')
	const files = glob.scan({ cwd: path, absolute: true })

	return files
}

function getOldJsonFiles(path: string) {
	const glob = new Bun.Glob('*.json')
	return glob.scan({ cwd: path, absolute: true })
}

function getOldErrorFiles(path: string) {
	const glob = new Bun.Glob('**/*.error.json')
	return glob.scan({ cwd: path, absolute: true })
}
