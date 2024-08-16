import { TypeGuard, type TSchema } from '@sinclair/typebox'
import * as Assets from './Assets.js'
import * as Atlas from './Atlas.js'
import * as DelveSites from './DelveSites.js'
import * as Moves from './Moves.js'
import * as Npcs from './Npcs.js'
import * as Oracles from './Oracles.js'
import * as Rarities from './Rarities.js'
import * as Rules from './Rules.js'
import * as Truths from './Truths.js'
import * as Entities from './Entities.js'
import { RulesPackage, Ruleset, Expansion } from './RulesPackages.js'

import Id from './common/Id.js'
import * as Text from './common/Text.js'
import * as Metadata from './common/Metadata.js'
import * as Player from './common/Player.js'
import * as Progress from './common/Progress.js'
import * as Rolls from './common/Rolls.js'
import * as RollableValues from './common/RollableValues.js'

import Log from '../scripts/utils/Log.js'
import { pickBy } from 'lodash-es'
import { DefsKey } from '../scripts/const.js'
import { DiceRange } from './common/Range.js'

function validateSchemaDefinitions(defs: Record<string, TSchema>) {
	const usedRefs = new Set<string>()
	const availableRefs = new Set<string>()

	// lazy way to iterate over all values
	void JSON.stringify(defs, (k, v) => {
		if (k === '$ref' && typeof v === 'string') usedRefs.add(v)
		if (k === '$id' && typeof v === 'string') availableRefs.add(v)
		return v
	})

	const invalidPointers = new Set<string>()
	const unusedDefinitions = new Set<string>()

	const allPointers = new Set<string>([...usedRefs, ...availableRefs])

	for (const pointer of allPointers) {
    if (pointer.startsWith('http')) continue
				if (!usedRefs.has(pointer)) unusedDefinitions.add(pointer)
				if (!availableRefs.has(pointer)) invalidPointers.add(pointer)
	}

	// console.log('unusedDefinitions', unusedDefinitions)
	if (invalidPointers.size > 0)
		throw new Error(
			`Missing referenced definitions: ${Array.from(invalidPointers).join(', ')}`
		)
}

const defsBase = pickBy(
	{
		RulesPackage,
		Ruleset,
		Expansion,
		...Id,
		...Metadata,
		...Text,
		...Rules,
		...Progress,
		...RollableValues,
		...Npcs,
		...Rolls,
		DiceRange,
		...Entities,
		...Oracles,
		...Moves,
		...Assets,
		...Truths,
		...Atlas,
		...Player,
		...Rarities,
		...DelveSites
	} as Record<string, TSchema>,
	(schema, key) => {
		if (typeof schema !== 'object') return false

		if (typeof schema.$id !== 'string') {
			Log.warn(`Schema in #/${DefsKey}, but doesn't have an ID?`)
			Log.warn(JSON.stringify(schema))
			return false
		}

		if (key !== schema.$id)
			Log.warn(`Schema has $id ${schema.$id}, but its key is ${key}`)

		return true
	}
)

validateSchemaDefinitions(defsBase)

export type Defs = Record<string, TSchema>
const entries: [string, TSchema][] = Object.values<TSchema>(defsBase).map(
	(entry) => [entry.$id, entry]
)

const Defs: Defs = Object.fromEntries(
	entries.sort(([a], [b]) => a.localeCompare(b))
)

export default Defs
