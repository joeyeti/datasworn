import {
	Type,
	type Static,
	type TAnySchema,
	type TBigInt
} from '@sinclair/typebox'
import * as Text from '../common/Text.js'
import type { TOracleRoll } from '../common/Rolls.js'
import { UnionEnumFromRecord } from '../utils/UnionEnumFromRecord.js'

enum Outcome {
	Miss = 'miss',
	WeakHit = 'weak_hit',
	StrongHit = 'strong_hit'
}

enum RollMethod {
	Miss = Outcome.Miss,
	WeakHit = Outcome.WeakHit,
	StrongHit = Outcome.StrongHit,
	PlayerChoice = 'player_choice',
	Highest = 'highest',
	Lowest = 'lowest',
	All = 'all'
}

// ENUMS

export const MoveRollType = UnionEnumFromRecord(
	{
		no_roll: 'A move that makes no action rolls or progress rolls.',
		action_roll: 'A move that makes an action roll.',
		progress_roll:
			'A progress move that rolls on a standard progress track type (defined by this move).',
		special_track:
			'A progress move that rolls on one or more special tracks, like Bonds (classic Ironsworn), Failure (Delve), or Legacies (Starforged).'
	},
	{ $id: 'MoveRollType' }
)

export type MoveRollType = Static<typeof MoveRollType>
export type TMoveRollType = typeof MoveRollType

const MoveOutcomeType = UnionEnumFromRecord(
	{
		[Outcome.Miss]: "The score doesn't beat either challenge die.",
		[Outcome.WeakHit]: 'The score is greater than one challenge die.',
		[Outcome.StrongHit]: 'The score is greater than both challenge dice.'
	},
	{
		$id: 'MoveOutcomeType'
	}
)
type MoveOutcomeType = Static<typeof MoveOutcomeType>

const rollMethodForceOutcome = {
	[RollMethod.Miss]: 'An automatic miss.',
	[RollMethod.WeakHit]: 'An automatic weak hit.',
	[RollMethod.StrongHit]: 'An automatic strong hit.'
}

const rollMethodOutcomeCommon = {
	[RollMethod.PlayerChoice]: 'The player chooses which roll option to use.',
	[RollMethod.Highest]: 'Use the roll option with the best/highest value.',
	[RollMethod.Lowest]: 'Use the roll option with the worst/lowest value.',
	[RollMethod.All]: 'Use _every_ roll option at once.'
}

export const ActionRollMethod = UnionEnumFromRecord(
	{
		...rollMethodForceOutcome,
		...rollMethodOutcomeCommon
	},
	{ $id: 'ActionRollMethod' }
)
export type ActionRollMethod = Static<typeof ActionRollMethod>

export const SpecialTrackRollMethod = UnionEnumFromRecord(
	{
		...rollMethodForceOutcome,
		...rollMethodOutcomeCommon
	},
	{ $id: 'SpecialTrackRollMethod' }
)

export type SpecialTrackRollMethod = Static<typeof SpecialTrackRollMethod>

export const ProgressRollMethod = UnionEnumFromRecord(
	{
		...rollMethodForceOutcome,
		progress_roll:
			'Make a progress roll on a progress track associated with this move.'
	},
	{ $id: 'ProgressRollMethod' }
)
export type ProgressRollMethod = Static<typeof ProgressRollMethod>

export const MoveOutcome = Type.Object(
	{
		text: Type.Ref(Text.MarkdownString, {
			pattern: /On a __(strong hit|weak hit|miss)__/.source,
			type: 'string'
		}),
		oracle_rolls: Type.Optional(Type.Array(Type.Ref<TOracleRoll>('OracleRoll')))
		// count_as: Type.Optional(Type.Ref(MoveOutcomeType))
	},
	{ $id: 'MoveOutcome' }
)
export type MoveOutcome = Static<typeof MoveOutcome>

// export const MoveOutcomeMatchable = Assign(
// [	MoveOutcome, Type.Object({ match: Type.Optional(Type.Ref(MoveOutcome)) })],
// 	{ $id: 'MoveOutcomeMatchable' }
// )
// export type MoveOutcomeMatchable = Static<typeof MoveOutcomeMatchable>

export const MoveOutcomes = Type.Object(
	{
		[Outcome.StrongHit]: Type.Ref<typeof MoveOutcome>('MoveOutcome'),
		// [Outcome.StrongHit]: Type.Ref<typeof MoveOutcomeMatchable>('MoveOutcomeMatchable'),
		[Outcome.WeakHit]: Type.Ref<typeof MoveOutcome>('MoveOutcome'),
		[Outcome.Miss]: Type.Ref<typeof MoveOutcome>('MoveOutcome')
		// [Outcome.Miss]: Type.Ref<typeof MoveOutcomeMatchable>('MoveOutcomeMatchable'),
	},
	{
		$id: 'MoveOutcomes',
		description: `A standalone localized description for each move outcome (miss, weak hit, or strong hit). This is for for e.g. VTT implementations, where it's often useful to display only the rules text relevant to a roll result.

  This often requires light editorialization to create text that can stand alone without reference to the rest of the move. For example, 'as above' (in reference to another move outcome) shouldn't be used here; instead, the relevant text should be repeated.`
	}
)
export type MoveOutcomes = Static<typeof MoveOutcomes>
export type TMoveOutcomes = typeof MoveOutcomes

export type SchemaOf<T> = Exclude<TAnySchema, TBigInt> & { static: T }
