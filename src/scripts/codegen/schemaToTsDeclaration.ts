import {
	Kind,
	type TArray,
	TypeGuard,
	type TObject,
	type TSchema,
	type TTuple,
} from '@sinclair/typebox'
import {
	isEqual,
	isNull,
	isUndefined,
	map,
	mapValues,
	pick,
	repeat,
	uniq,
} from 'lodash-es'
import {
	TDiscriminatedUnion,
	TNullable,
	TUnionEnum,
} from '../../schema/Utils.js'
import Log from '../utils/Log.js'
import { $schema } from '../const.js'

export function extractDefs(defs: Record<string, TSchema>) {
	return mapValues(defs, (v, k) => renderDefinition(k, v))
}

// keywords where they can be included close to as-is. boolean keywords generally have their value omitted, leaving just the tag: "@i18n" rather than "@i18n true"
const extractableKeywords: string[] = [
	'minimum',
	'maximum',
	'i18n',
	'deprecated',
]

// keywords where a string value is expected, and the string value is the keyword
const extractableKeywordValues: string[] = ['releaseStage']

function extractKeywords(schema: TSchema) {
	const jsDoc: string[] = []

	if (schema.description) jsDoc.push(schema.description)
	if (schema.remarks) jsDoc.push(tag('remarks', schema.remarks))
	if (schema.pattern)
		jsDoc.push(tag('pattern', wrapCodeBlock(`/${schema.pattern}/`)))
	if (schema.examples)
		jsDoc.push(
			...schema.examples
				.filter(
					(example: unknown) =>
						typeof example !== 'string' || !example.includes('*')
				)
				.map((example: unknown) => {
					let tagContent = renderJsValue(example)
					if (tagContent.includes('\n'))
						tagContent = formatSourceCode(tagContent)

					// console.log(tagContent)

					return tag('example', tagContent)
				})
		)
	if (!isUndefined(schema.default)) {
		if (!isEqual(schema.default, schema.const)) {
			let tagContent = renderJsValue(schema.default)
			if (tagContent.includes('\n'))
				tagContent = '\n' + formatSourceCode(tagContent)
			jsDoc.push(tag('default', tagContent))
		}
	}

	jsDoc.push(
		...toTags(
			mapValues(pick(schema, ...extractableKeywords), (v, k) =>
				v === true ? undefined : v
			)
		)
	)

	jsDoc.push(
		...Object.values(pick(schema, ...extractableKeywordValues)).map((k) =>
			tag(k as string)
		)
	)

	return jsDoc
}

function renderJsDoc(lines: string[]) {
	// return ['/**', ...lines.map((line) => ' * ' + line), ' */'].join('\n')
	return [
		'/**',
		...lines
			.join('\n')
			.split('\n')
			.map((line) => ' * ' + line),
		' */',
	].join('\n')
}

function extractType(schema: TSchema): string {
	// if (schema.$id) Log.info(`constructing type for ${schema.$id}`)
	switch (true) {
		case TypeGuard.IsIntersect(schema):
			return uniq(schema.allOf.map(extractType))
				.map((type) => (type.includes('|') ? '(' + type + ')' : type))
				.join(' & ')

		case TypeGuard.IsThis(schema):
		case TypeGuard.IsRef(schema):
			// special case: embedded schema
			return schema.$ref === $schema ? 'unknown' : schema.$ref
		case TypeGuard.IsLiteral(schema):
			return JSON.stringify(schema.const)
		case TypeGuard.IsInteger(schema):
			return 'number'
		case TypeGuard.IsString(schema):
		case TypeGuard.IsBoolean(schema):
		case TypeGuard.IsNull(schema):
		case TypeGuard.IsNumber(schema):
			return schema.type
		case TypeGuard.IsTuple(schema):
			return extractTupleType(schema)
		case TypeGuard.IsArray(schema):
			return extractArrayType(schema)
		case schema[Kind] === 'Object':
		case TypeGuard.IsObject(schema):
			return extractObjectLiteralType(schema as any)
		case TypeGuard.IsUnion(schema):
		case TNullable(schema):
			return uniq(schema.anyOf.map(extractType)).join(' | ')
		case TypeGuard.IsRecord(schema): {
			const keyType = 'DictKey'
			const valueType = extractType(Object.values(schema.patternProperties)[0])
			return `Record<${keyType}, ${valueType}>`
			// return `Record<${keyType}, ${valueType}> | Map<${keyType}, ${valueType}>`
		}
		case TDiscriminatedUnion(schema):
			return uniq(schema.allOf.map((item) => extractType(item.then))).join(
				' | '
			)
		case TUnionEnum(schema):
			return uniq(schema.enum.map((v) => JSON.stringify(v))).join(' | ')

		default: {
			Log.info(JSON.stringify(schema))
			throw new Error(
				`missing transform for kind of ${JSON.stringify(schema?.$id)}: ${JSON.stringify(schema[Kind])}`
			)
		}
	}
}

type ParsedType = { type: string; jsDoc: string[] }

function extractArrayType(schema: TArray<TSchema>): string {
	const innerType = extractType(schema.items)
	const isComplexType = innerType.match(/[^A-z]/)
	return isComplexType ? `Array<${innerType}>` : `${innerType}[]`
}

function parseType(schema: TSchema): ParsedType {
	return {
		type: extractType(schema),
		jsDoc: extractKeywords(schema),
	}
}

function indent(text: string, levels = 1) {
	const indentString = repeat('\t', levels)
	return text
		.replaceAll(/\n/g, '\n' + indentString)
		.replaceAll(/^/g, indentString)
}

function renderProperty(key: string, schema: TSchema) {
	let head = key
	if (TypeGuard.IsOptional(schema)) head += '?'
	const { type, jsDoc } = parseType(schema)

	const lines = []

	if (jsDoc.length > 0) lines.push(renderJsDoc(jsDoc))

	lines.push(`${head}: ${type};`)

	return lines.join('\n')
}

function renderTypeAlias(identifier: string, schema: TSchema) {
	const data = parseType(schema)
	const lines = []

	if (data.jsDoc.length > 0) lines.push(renderJsDoc(data.jsDoc))

	lines.push(`export type ${identifier} = ${data.type}`)

	return lines.join('\n')
}

function renderInterface(identifier: string, schema: TObject) {
	const data = parseType(schema)

	const lines = []

	if (data.jsDoc.length > 0) lines.push(renderJsDoc(data.jsDoc))

	lines.push(`export interface ${identifier} ` + data.type)

	return lines.join('\n')
}

function extractObjectLiteralType(schema: TObject): string {
	const properties = Object.entries(schema.properties).map((entry) =>
		renderProperty(...entry)
	)
	const typeLines = [`{`, indent(properties.join('\n')), `}`]

	return typeLines.join('\n')
}

function extractTupleType(schema: TTuple): string {
	const items = (schema.items as TSchema[]).map(extractType)
	return [`[`, indent(items.join(',\n')), `]`].join('\n')
}

function tag(tag: string, text?: string) {
	if (text) return `@${tag} ${text}`
	return `@${tag}`
}

function toTags(tags: Record<string, string | undefined>) {
	return Object.entries(tags).map((strings) => tag(...strings))
}

function renderDefinition(identifier: string, schema: TSchema) {
	switch (true) {
		case TypeGuard.IsObject(schema):
			return renderInterface(identifier, schema)
		default:
			return renderTypeAlias(identifier, schema)
	}
}

function renderJsValue(value: unknown): string {
	let result: string
	switch (true) {
		case Array.isArray(value):
			result =
				value.length === 0 ? `[]` : `[ ${value.map(renderJsValue).join(', ')} ]`
			break
		case isUndefined(value):
			result = 'undefined'
			break
		case isNull(value):
			result = 'null'
			break

		case typeof value === 'object':
			result =
				Object.keys(value as any).length === 0
					? `{}`
					: `{\n${indent(
							map(value as any, (v, k) => `${k}: ${renderJsValue(v)}`).join(
								',\n'
							)
						)}\n}`
			break
		case typeof value === 'string':
		case typeof value === 'number':
		case typeof value === 'boolean':
			result = JSON.stringify(value)
			break
		default:
			throw new Error()
	}
	// console.log(result)
	return result
}

function wrapCodeBlock(code: string) {
	return '```javascript\n' + code + '\n```'
}

function formatSourceCode(code: string) {
	if (code.includes('\n')) code = wrapCodeBlock(indent(code))

	return code
}
