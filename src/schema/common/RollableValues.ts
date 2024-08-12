import {
	Type,
	type ObjectOptions,
	type Static,
	type TObject
} from '@sinclair/typebox'
import * as Utils from '../Utils.js'
import Id from './Id.js'
import * as Text from './Text.js'
import * as Player from './Player.js'
import { Assign } from '../utils/FlatIntersect.js'

const RollableValueType = Utils.UnionEnumFromRecord(
	{
		stat: 'A reference to the value of a standard player character stat.',
		condition_meter:
			'A reference to the value of a standard player condition meter.',
		asset_control: 'A reference to the value of an asset control.',
		asset_option: 'A reference to the value of an asset option.',
		custom: 'An arbitrary static integer value with a label.',
		attached_asset_control:
			'A reference to the value of an attached asset control. For example, a Module asset could use this to roll using the `integrity` control of an attached Vehicle.',
		attached_asset_option:
			'A reference to the value of an attached asset option.'
	},
	{ $id: 'RollableValueType' }
)
type RollableValueType = Static<typeof RollableValueType>

function RollableValueBase<
	Using extends RollableValueType,
	Props extends TObject
>(using: Using, props: Props, options: ObjectOptions = {}) {
	const constant = Utils.ExtractLiteralFromEnum(RollableValueType, using)
	return Assign(
		props,
		Type.Object({
			using: constant
		}),
		{
			description: constant.description,
			...options
		}
	)
}

export const AssetControlValueRef = RollableValueBase(
	'asset_control',
	Type.Object({
		assets: Utils.Nullable(
			Type.Array(Type.Ref(Id.AssetIdWildcard), { default: null }),
			{
				default: null,
				description:
					"Asset IDs (which may be wildcarded) that may provide the control field. For asset ability enhancements, `null` is used to represent the asset's own control fields."
			}
		),
		control: Type.Ref(Id.DictKey, {
			description: 'The dictionary key of the asset control field.',
			examples: ['health', 'integrity']
		})
	}),
	{ $id: 'AssetControlValueRef' }
)

export type AssetControlValueRef = Static<typeof AssetControlValueRef>

export const AttachedAssetControlValueRef = RollableValueBase(
	'attached_asset_control',
	Type.Pick(AssetControlValueRef, ['control']),
	{ $id: 'AttachedAssetControlValueRef' }
)

export type AttachedAssetControlValueRef = Static<
	typeof AttachedAssetControlValueRef
>

export const AssetOptionValueRef = RollableValueBase(
	'asset_option',
	Type.Object({
		assets: Utils.Nullable(Type.Array(Type.Ref(Id.AssetIdWildcard)), {
			default: null,
			description:
				"Asset IDs (which may be wildcarded) that may provide the option field. For asset ability enhancements, `null` is used to represent the asset's own option fields."
		}),
		option: Type.Ref(Id.DictKey, {
			description: 'The dictionary key of the asset option field.'
		})
	}),
	{ $id: 'AssetOptionValueRef' }
)

export type AssetOptionValueRef = Static<typeof AssetOptionValueRef>

export const AttachedAssetOptionValueRef = RollableValueBase(
	'attached_asset_option',
	Type.Pick(AssetOptionValueRef, ['option']),
	{ $id: 'AttachedAssetOptionValueRef' }
)

export type AttachedAssetOptionValueRef = Static<
	typeof AttachedAssetOptionValueRef
>

export const StatValueRef = RollableValueBase(
	'stat',
	Type.Object({
		stat: Type.Ref(Player.StatKey)
	}),
	{ $id: 'StatValueRef' }
)

export type StatValueRef = Static<typeof StatValueRef>

export const ConditionMeterValueRef = RollableValueBase(
	'condition_meter',
	Type.Object({
		condition_meter: Type.Ref(Player.ConditionMeterKey)
	}),
	{ $id: 'ConditionMeterValueRef' }
)
export type ConditionMeterValueRef = Static<typeof ConditionMeterValueRef>

export const CustomValue = RollableValueBase(
	'custom',
	Type.Object({
		label: Type.Ref(Text.Label),
		value: Type.Integer()
	}),
	{ $id: 'CustomValue' }
)
export type CustomValue = Static<typeof CustomValue>

export const RollableValue = Utils.DiscriminatedUnion(
	{
		stat: StatValueRef,
		condition_meter: ConditionMeterValueRef,
		asset_control: AssetControlValueRef,
		asset_option: AssetOptionValueRef,
		attached_asset_control: AttachedAssetControlValueRef,
		attached_asset_option: AttachedAssetOptionValueRef,
		custom: CustomValue
	},
	'using',
	{
		$id: 'RollableValue',
		description:
			'Provides a value like a stat, condition meter, or other number (usually for use in an action roll). The expected value is an integer, or null.'
	}
)

export type RollableValue = Static<typeof RollableValue>
