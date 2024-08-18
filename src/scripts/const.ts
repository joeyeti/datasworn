import path from 'node:path'
import { VERSION } from '../scripts/const.js'

const src = path.join(process.cwd(), 'src')

export const PKG_NAME = 'Datasworn'

export const SCHEMA_NAME = 'Datasworn'
export const SOURCE_SCHEMA_NAME = 'DataswornSource'

export const PKG_SCOPE_OFFICIAL = '@datasworn'
export const PKG_SCOPE_COMMUNITY = '@datasworn-community-content'

export const PKG_ROOT = path.join(process.cwd(), 'pkg')

export const CORE_COMMON = path.join(src, 'pkg-core')

export const PKG_DIR_NODE = path.join(PKG_ROOT, 'nodejs')

export const LEGACY_ID_DIR = path.join(src, 'legacy_id_map.json')

export const ROOT_SOURCE_DATA = path.join(process.cwd(), 'source_data')
export const ROOT_OUTPUT = path.join(process.cwd(), 'datasworn')
export const ROOT_HISTORY = path.join(src, 'migration/history')
export const DIR_HISTORY_CURRENT = path.join(ROOT_HISTORY, VERSION)
export const ROOT_TYPES_OUT = path.join(src, 'types')

export const SCHEMA_PATH = path.join(ROOT_OUTPUT, 'datasworn.schema.json')
export const SOURCE_SCHEMA_PATH = path.join(
	ROOT_OUTPUT,
	'datasworn-source.schema.json'
)
export const SOURCEDATA_SCHEMA_PATH = path.join(
	ROOT_SOURCE_DATA,
	'datasworn-source.schema.json'
)

export const SCHEMA_DELVE_OUT = path.join(
	ROOT_OUTPUT,
	'datasworn-delve.schema.json'
)

export const SCHEMA_DELVE_IN = path.join(
	ROOT_OUTPUT,
	'datasworn-delve-source.schema.json'
)

export const SCHEMA_ID = 'https://ironswornrpg.com/datasworn.schema.json'

export const SOURCE_SCHEMA_ID =
	'https://ironswornrpg.com/datasworn-source.schema.json'

export const DELVE_SCHEMA_ID =
	'https://ironswornrpg.com/datasworn-delve.schema.json'

export const DELVE_SOURCE_ID =
	'https://ironswornrpg.com/datasworn-delve-source.schema.json'

// FIXME: it'd be nice to migrate to https://json-schema.org/draft/2020-12/meta/core some day, but currently vscode doesn't support it very well

/** JSON schema draft used by Datasworn. */
export const $schema = 'http://json-schema.org/draft-07/schema#' as const
/** The standard key for definitions in the JSON schema draft. */
export const DefsKey = 'definitions' as const

/** Identifier for the type at the root of a Datasworn JSON file. */
export const rootSchemaName = 'RulesPackage'

export * from '../pkg-core/IdElements/CONST.js'
