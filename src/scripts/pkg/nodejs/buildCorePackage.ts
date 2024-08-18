import { Compiler } from '@swc/core'
import path from 'node:path'
import {
	LEGACY_ID_DIR,
	PKG_DIR_NODE,
	PKG_SCOPE_OFFICIAL,
	ROOT_HISTORY,
	SCHEMA_PATH,
	SOURCE_SCHEMA_PATH,
	VERSION
} from '../../const.js'
import Log from '../../utils/Log.js'
import { copyFile, emptyDir, writeJSON } from '../../utils/readWrite.js'
import { Glob } from 'bun'

new Compiler()

const corePkgSrcRoot = path.join('src/pkg-core')
const corePkgOutRoot = path.join(PKG_DIR_NODE, PKG_SCOPE_OFFICIAL, 'core')

const id = `${PKG_SCOPE_OFFICIAL}/core`
const jsonDir = path.join(corePkgOutRoot, 'json')

const corePkgDist = path.join(corePkgOutRoot, 'dist')
const corePkgMigration = path.join(corePkgOutRoot, 'migration')

export const config = {
	id,
	corePkgOutRoot,
	jsonDir,
} as const

async function buildLegacyDataforgedIdMap() {
	const glob = new Bun.Glob('**/*.json')

	const legacyIdRoot = 'src/legacy_ids/dataforged'

	const loadOps: Promise<unknown>[] = []

	for await (const file of glob.scan({ cwd: legacyIdRoot, absolute: true })) {
		loadOps.push(Bun.file(file).json())
	}

	const objects = await Promise.all(loadOps)

	const mergedObject: Record<string, string | null> = {}

	for (const obj of objects) Object.assign(mergedObject, obj)

	return mergedObject
}

/** Assembles the core package from built data, which contains types, schema, and documentation. */
export async function buildCorePackage({
	id,
	jsonDir,
}: typeof config = config) {
	Log.info(`⚙️  Building ${id}...`)

  // flush any old files
	await Promise.all([emptyDir(jsonDir), emptyDir(corePkgDist)])

  const writeOps: Promise<unknown>[] = [
			copyFile(SCHEMA_PATH, path.join(jsonDir, 'datasworn.schema.json')),
			copyFile(
				SOURCE_SCHEMA_PATH,
				path.join(jsonDir, 'datasworn-source.schema.json')
			),

			writeJSON(
				path.join(corePkgMigration, 'dataforged_legacy', 'id_map.json'),
				await buildLegacyDataforgedIdMap()
			)
		]

	const migrationFileGlob = new Glob('*/*_map.json')
	/** Paths relative to ROOT_HISTORY which are to be evaluated for copying.
	 * @example "0.1.0/id_map.json"
	 */
	const migrationFiles = migrationFileGlob.scan(ROOT_HISTORY)

	for await (const sourceFile of migrationFiles) {
		const [version, filename] = sourceFile.split('/')
		// skip if this filepath is for a higher version, somehow
		if (Bun.semver.order(VERSION, version) === -1) continue

		const destination = path.join(corePkgMigration, version, filename)

		writeOps.push(copyFile(path.join(ROOT_HISTORY, sourceFile), destination))
	}

	await Promise.all(writeOps)

	return Log.info(`✅ Finished building ${id}`)
}
