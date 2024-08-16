import { Type, type TSchema } from '@sinclair/typebox'
import { DictKey } from '../common/Id.js'
import { $schema } from '../../scripts/const.js'
import type { JSONSchema7 } from 'json-schema'
import { Documentation } from '../common/Text.js'
import { JsonTypeDef, Typescript } from '../Symbols.js'
import JtdType from '../../scripts/json-typedef/typedef.js'

const TagSchemaBase = Type.Object({ description: Type.Ref(Documentation) })

const StringEnumSchema = Type.Object({
	enum: Type.Array(Type.Ref(DictKey))
})

const IntegerEnumSchema = Type.Object({
	enum: Type.Array(Type.Integer())
})

const BooleanSchema = Type.Object({
	type: Type.Const('boolean')
})

const NumberSchema = Type.Object({
	type: Type.Const('number')
})

const IntegerSchema = Type.Object({ type: Type.Const('integer') })

const relativeRefPattern = /^#\/definitions\/[A-Z][A-z0-9]*$/

const DataswornRefSchema = Type.Object({
	$ref: Type.String({
		pattern: relativeRefPattern.source
	})
})

export const SafeValueSchema = Type.Union(
	[
		DataswornRefSchema,
		// enumerations
		StringEnumSchema,
		IntegerEnumSchema,
		// primitives
		BooleanSchema,
		NumberSchema,
		IntegerSchema
		// basic string schema intentionally omitted. *must* use an existing datasworn string type!
	],
	{
		$id: 'SafeValueSchema',
		[JsonTypeDef]: { schema: JtdType.Any() },
		releaseStage: 'experimental',
		description:
			"A JSON schema representing a single value (or reference) that's possible to represent in most languages."
	}
)

const PropertiesSchema = Type.Object({
	type: Type.Const('object'),
	properties: Type.Record(DictKey, Type.Ref(SafeValueSchema))
})

const ArraySchema = Type.Object({
	type: Type.Const('array'),
	items: Type.Ref(SafeValueSchema)
})

// future additions - nested objects?

const schemaKeyBlacklist = [
	'$id',
	'$defs',
	'$schema',
	'definitions',
	'dependencies',
	'if',
	'then',
	'else',
	'allOf',
	'anyOf',
	'oneOf',
	'not',
	'additionalItems',
	'additionalProperties'
] as const satisfies (keyof JSONSchema7)[]

type SafeValueSchema = Omit<JSONSchema7, (typeof schemaKeyBlacklist)[number]>

type SafePrimitiveSchema = { type: 'integer' | 'number' | 'boolean' }

export const TagSchema = Type.Intersect(
	[
		Type.Ref($schema),
		// everything *must* have a description.
		TagSchemaBase,
		Type.Union([Type.Ref(SafeValueSchema), PropertiesSchema, ArraySchema]),
		Type.Not(
			Type.Record(
				Type.Enum(Object.fromEntries(schemaKeyBlacklist.map((v) => [v, v]))),
				Type.Any()
			)
		)
	],
	{
		$id: 'TagSchema',
		// TODO: JTD schema for JSON schema of JSON schema? :sob:
		[JsonTypeDef]: { schema: JtdType.Any() },
		// TODO: add json schema type stub lib as dependency; point at this type
		[Typescript]: (identifier: string, _schema: TSchema) =>
			`export type ${identifier} = Record<string, unknown>`,
		description:
			'A JSON schema used to validate the tag data, with a mandatory description.',
		releaseStage: 'experimental',
		examples: [
			Type.Boolean({
				description: 'An example tag with a simple true/false value.'
			}),
			Type.Array(Type.Ref('OracleRollableIdWildcard'), {
				description:
					'An example tag with an array of oracle rollable ID wildcards.'
			})
		]
	}
)