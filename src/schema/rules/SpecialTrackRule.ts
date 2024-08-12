import { type Static, Type } from '@sinclair/typebox'
import * as Text from '../common/Text.js'

export const SpecialTrackRule = Type.Object(
	{
		label: Type.Ref(Text.Label, {
			description: 'A label for this special track.'
		}),
		description: Type.Ref(Text.MarkdownString, {
			description: 'A description of this special track.'
		}),
		shared: Type.Boolean({
			default: false,
			description: 'Is this track shared by all players?'
		}),
		optional: Type.Boolean({
			default: false,
			description: 'Is this track an optional rule?'
		})
	},
	{
		$id: 'SpecialTrackRule',
		description:
			'Describes a special track like Bonds (classic Ironsworn), Failure (Delve), or Legacies (Starforged).'
	}
)
export type SpecialTrackRule = Static<typeof SpecialTrackRule>
