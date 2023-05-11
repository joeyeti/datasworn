import type * as Types from 'schema'
import { JTDSchemaType } from 'ajv/dist/core'
import { toJtdId } from 'json-typedef/utils'
import { RarityID as ID } from 'schema-json/rarities'

export const Rarity: JTDSchemaType<
	Types.Rarities.Rarity,
	{
		RarityID: string
		AssetID: string
		MarkdownString: string
		Label: string
		Source: Types.Metadata.Source
		SvgImageURL: string
		Suggestions: Types.Metadata.Suggestions
	}
> = {
	properties: {
		id: { ref: 'RarityID' },
		name: { ref: 'Label' },
		asset: { ref: 'AssetID' },
		xp_cost: { type: 'uint8' },
		description: { ref: 'MarkdownString' },
		source: { ref: 'Source' }
	},
	optionalProperties: {
		icon: { ref: 'SvgImageURL' },
		suggestions: { ref: 'Suggestions' }
	}
}
