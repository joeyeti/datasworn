import { Type, type Static } from '@sinclair/typebox'
import {
	ExtractLiteralFromEnum,
	JsonEnumFromRecord
} from '../../../typebox/enum.js'
import { Id, Localize, Metadata } from '../common/index.js'
import * as Generic from '../utils/Generic.js'
import { DiscriminatedUnion } from '../../../typebox/discriminated-union.js'

export const OracleTableColumnContentKey = JsonEnumFromRecord(
	{
		roll: 'Column displays the roll range (`min` and `max`) of each OracleTableRow.',
		result: "Column displays the OracleTableRow's `result` key.",
		summary: "Column displays the OracleTableRow's `summary` key.",
		description: "Column displays the OracleTableRow's `description` key."
	},
	{
		description:
			'The value(s) from each OracleTableRow that is rendered in this column.',
		$id: '#/$defs/OracleTableColumnContentKey'
	}
)
type OracleTableColumnContentKey = Static<typeof OracleTableColumnContentKey>

export const OracleTableColumn = Type.Object(
	{
		label: Type.Ref(Localize.Label, {
			description: "The column's header text."
		}),
		content_type: Type.Ref(OracleTableColumnContentKey),
		color: Type.Optional(
			Type.Ref(Metadata.CssColor, {
				description: 'The thematic color for this column.'
			})
		)
	},
	{
		$id: '#/$defs/OracleTableColumn',
		examples: [
			{ label: 'Roll', content_type: 'roll' },
			{ label: 'Result', content_type: 'result' },
			{ label: 'Summary', content_type: 'summary' }
		]
	}
)
export type OracleTableColumn = Static<typeof OracleTableColumn>

export const OracleCollectionTableColumn = Generic.Flatten(
	[
		OracleTableColumn,
		Type.Object({
			table_key: Type.Ref(Id.DictKey, {
				description:
					'The key of the OracleTable (within this collection), whose data is used to render this column.'
			})
		})
	],
	{
		$id: '#/$defs/OracleCollectionTableColumn',
		default: undefined
	}
)
export type OracleCollectionTableColumn = Static<
	typeof OracleCollectionTableColumn
>

const OracleRenderingBase = Type.Object({
	columns: Type.Optional(
		Generic.Dictionary(Type.Ref(OracleTableColumn), {
			description:
				'Describes the rendering of this oracle as a standalone table.'
		})
	),
	color: Type.Optional(Type.Ref(Metadata.CssColor))
})

export const OracleCollectionStyle = JsonEnumFromRecord(
	{
		tables: 'Presented as a collection of separate tables.',
		multi_table:
			'Presented as a single table, with its OracleTable children rendered as columns.'
	},
	{
		$id: '#/$defs/OracleCollectionStyle'
	}
)
export type OracleCollectionStyle = Static<typeof OracleCollectionStyle>

const OracleCollectionRenderingTables = Type.Object({
	style: ExtractLiteralFromEnum(OracleCollectionStyle, 'tables')
})

const OracleCollectionRenderingMultiTable = Type.Object({
	style: ExtractLiteralFromEnum(OracleCollectionStyle, 'multi_table'),
	columns: Generic.Dictionary(Type.Ref(OracleCollectionTableColumn))
})

export const OracleCollectionRendering = DiscriminatedUnion(
	'style',
	[OracleCollectionRenderingTables, OracleCollectionRenderingMultiTable],
	{
		$id: '#/$defs/OracleCollectionRendering',
		description:
			'Describes the presentation of this oracle collection, which might represent a group of separate tables, or a single table with additional columns.'
	}
)
export type OracleCollectionRendering = Static<typeof OracleCollectionRendering>

export const OracleTableStyle = JsonEnumFromRecord(
	{
		standalone: 'Render as a standalone table.',
		embed_in_row: 'Render as a table, within a row in another table.',
		column: 'Render as a single column of a table.'
	},
	{ $id: '#/$defs/OracleTableStyle' }
)
export type OracleTableStyle = Static<typeof OracleTableStyle>

const OracleTableRenderingStandalone = Type.Object({
	style: ExtractLiteralFromEnum(OracleTableStyle, 'standalone'),
	columns: Generic.Dictionary(Type.Ref(OracleTableColumn), {
		default: {
			roll: { label: 'Roll', content_type: 'roll' },
			result: { label: 'Result', content_type: 'result' }
		}
	})
})

const OracleTableRenderingColumn = Type.Object({
	style: ExtractLiteralFromEnum(OracleTableStyle, 'column')
})

const OracleTableRenderingEmbedInRow = Type.Object({
	style: ExtractLiteralFromEnum(OracleTableStyle, 'embed_in_row')
})

export const OracleTableRendering = DiscriminatedUnion(
	'style',
	[
		OracleTableRenderingStandalone,
		OracleTableRenderingColumn,
		OracleTableRenderingEmbedInRow
	],
	{
		$id: '#/$defs/OracleTableRendering',
		description: 'Describes the presentation of this table.',
		default: {
			style: 'standalone',
			columns: {
				roll: { label: 'Roll', content_type: 'roll' },
				result: { label: 'Result', content_type: 'result' }
			}
		}
	}
)
export type OracleTableRendering = Static<typeof OracleTableRendering>
