import { type Static, Type } from '@sinclair/typebox'

import * as Text from '../common/Text.js'

export const StatRule = Type.Object(
	{
		label: Type.Ref(Text.Label, {
			description: 'A label for this stat.',
			examples: ['edge']
		}),
		description: Type.Ref(Text.MarkdownString, {
			description: 'A description of this stat.',
			examples: ['Quickness, agility, and prowess when fighting at a distance.']
		})
	},
	{
		$id: 'StatRule',
		description: 'Describes a standard player character stat.'
	}
)
export type StatRule = Static<typeof StatRule>
