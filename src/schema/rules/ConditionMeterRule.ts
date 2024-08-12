import { Type, type Static } from '@sinclair/typebox'
import * as Inputs from '../common/Inputs.js'
import * as Text from '../common/Text.js'
import { Assign } from '../utils/FlatIntersect.js'

export const ConditionMeterRule = Assign(
	Type.Object({
		description: Type.Ref(Text.MarkdownString, {
			description: 'A description of this condition meter.'
		}),
		shared: Type.Boolean({
			default: false,
			description: 'Is this condition meter shared by all players?'
		})
	}),
	Inputs.Meter(Type.Literal(true)),
	{
		$id: 'ConditionMeterRule',
		description: 'Describes a standard player character condition meter.'
	}
)

export type ConditionMeterRule = Static<typeof ConditionMeterRule>
