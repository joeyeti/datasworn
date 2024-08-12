import {
	Type,
	TypeGuard,
	type ObjectOptions,
	type Static,
	type TArray,
	type TNull,
	type TSchema,
	type TObject,
	CloneType
} from '@sinclair/typebox'
import * as Text from '../common/Text.js'
import {
	setDescriptions,
	type TFuzzyNull,
	type TFuzzyObject,
	type TFuzzyRef
} from '../utils/typebox.js'
import * as Utils from '../Utils.js'
import { Assign } from '../utils/FlatIntersect.js'

export const TriggerBy = Type.Object(
	{
		player: Type.Boolean({
			default: true,
			description: 'Can this trigger be activated by the player who owns this?'
		}),
		ally: Type.Boolean({
			default: false,
			description:
				"Can this trigger be activated by one of the player's allies?"
		})
	},
	{
		$id: 'TriggerBy',
		title: 'TriggerBy',
		description:
			"Information on who can activate this trigger condition. Usually this is just the player, but some asset abilities can trigger from an ally's move."
	}
)
export type TriggerBy = Static<typeof TriggerBy>

const TriggerConditionBase = Type.Object({
	text: Type.Optional(
		Type.Ref(Text.MarkdownString, {
			description:
				'A markdown string of any trigger text specific to this trigger condition.'
		})
	),
	by: Type.Optional(Type.Ref(TriggerBy))
})

export function TriggerCondition<
	Method extends TFuzzyNull<Utils.TUnionEnum<string[]>>,
	RollOptions extends TFuzzyNull<TArray<TFuzzyObject<{ using: TSchema }>>>
>(method: Method, rollOptions: RollOptions, options: ObjectOptions = {}) {
	const roll_options: RollOptions = {
		description:
			'The options available when rolling with this trigger condition.',
		...rollOptions
	}
	return Assign(
		TriggerConditionBase,
		Type.Object({
			method,
			roll_options
		}),
		options
	)
}
export type TTriggerCondition<
	Method extends TFuzzyNull<Utils.TUnionEnum<string[]>> = TFuzzyNull<
		Utils.TUnionEnum<string[]>
	>,
	RollOptions extends TFuzzyNull<
		TArray<TFuzzyObject<{ using: TSchema }>>
	> = TFuzzyNull<TArray<TFuzzyObject<{ using: TSchema }>>>
> = ReturnType<typeof TriggerCondition<Method, RollOptions>>

export type TriggerCondition<
	Method extends string | null = string | null,
	RollOptions extends Array<{ using: any }> | null = Array<{
		using: any
	}> | null
> = { roll_options: RollOptions; method: Method }

export function TriggerConditionEnhancement<T extends TTriggerCondition>(
	triggerCondition: T,
	options: ObjectOptions
) {
	const RollOptions = Type.Index(triggerCondition, ['roll_options'])
	type RollOptions = typeof RollOptions

	const Method = Type.Index(triggerCondition, ['method'])

	type TNullableRollOptions = Omit<
		T['properties'],
		'roll_options' | 'method'
	> & {
		roll_options: RollOptions extends TNull | Utils.TNullable
			? RollOptions
			: Utils.TNullable<RollOptions>
		method: typeof Method extends TNull | Utils.TNullable
			? typeof Method
			: Utils.TNullable<typeof Method>
	}

	const rollOptionsAreNullable =
		TypeGuard.IsNull(Method) ?? Utils.TNullable(Method)

	const roll_options = rollOptionsAreNullable
		? RollOptions
		: Utils.Nullable(RollOptions, { default: null })

	const methodIsNullable = TypeGuard.IsNull(Method) ?? Utils.TNullable(Method)

	const method = methodIsNullable
		? Method
		: Utils.Nullable(Method, {
				description:
					'A `null` value means this condition provides no roll mechanic of its own; it must be used with another trigger condition that provides a non-null `method`.',
				default: null
			})

	const nuProps = {
		...triggerCondition.properties,
		roll_options,
		method
	} as TNullableRollOptions

	return Type.Object(nuProps, options)
}

const TriggerMixin = Type.Object({
	text: Type.Ref(Text.MarkdownString, {
		description:
			'A markdown string containing the primary trigger text for this move.\n\nSecondary trigger text (for specific stats or uses of an asset ability) may be described in individual trigger conditions.',
		type: 'string',
		pattern: /.*\.{3}/.source
	})
})

export function Trigger<
	T extends TFuzzyNull<TArray<TFuzzyRef<TTriggerCondition>>>
>(conditions: T, options: ObjectOptions = {}) {
	return Assign(
		TriggerMixin,
		setDescriptions(Type.Object({ conditions }), {
			conditions: 'Specific conditions that qualify for this trigger.'
		}),
		options
	) as TTrigger<T>
}
export type TTrigger<
	T extends TFuzzyNull<TArray<TFuzzyRef<TTriggerCondition>>> = TFuzzyNull<
		TArray<TFuzzyRef<TTriggerCondition>>
	>
> = TObject<(typeof TriggerMixin)['properties'] & { conditions: T }>

export type Trigger<
	T extends TriggerCondition[] | null = TriggerCondition[] | null
> = Static<typeof TriggerMixin> & { conditions: T }

export function TriggerEnhancement<
	T extends TFuzzyNull<TArray<TFuzzyRef<TTriggerCondition>>>
>(conditions: T, options: ObjectOptions) {
	return Type.Object(
		{
			conditions: {
				description: 'Trigger conditions added to the enhanced move.',
				...conditions
			} as T
		},
		{
			description:
				"Describes changes/additions made to the enhanced move's trigger conditions.",
			...options
		}
	)
}

export type TTriggerEnhancement<
	T extends TFuzzyNull<TArray<TFuzzyRef<TTriggerCondition>>> = TFuzzyNull<
		TArray<TFuzzyRef<TTriggerCondition>>
	>
> = ReturnType<typeof TriggerEnhancement<T>>
export type TriggerEnhancement<
	T extends TriggerCondition[] | null = TriggerCondition[] | null
> = { conditions: T }
