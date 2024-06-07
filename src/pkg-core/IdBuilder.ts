import type DataswornNode from './DataswornNode.js'
import CONST from './IdElements/CONST.js'
import type NodeTypeId from './IdElements/NodeTypeId.js'
import Pattern from './IdElements/Pattern.js'
import type { Datasworn } from './index.js'

type RegexGroupType =
	| 'none'
	| 'capture_group'
	| 'non_capturing_group'
	| 'named_capture_group'

// inexact but enough to catch some errors
type ValidDictKey = Exclude<string, `_${string}` | `${number}`>

type Dict<T = unknown> = Record<ValidDictKey, T>

type PropKeysOfType<O, T> = {
	[P in string & keyof O]-?: O[P] extends T ? P : never
}[keyof O & string]
type PickByType<O, T> = Pick<O, PropKeysOfType<O, T>>

type DictPropKeyIn<O> = PropKeysOfType<O, Dict>
type ArrayPropKeyIn<O> = PropKeysOfType<O, Array<any>>

type EntryInProp<O, P extends DictPropKeyIn<O> | ArrayPropKeyIn<O>> =
	O[P] extends Array<any> ? O[P][number] : O[P][keyof O[P]]

type WalkIteratee<T> = (value: T, pathKeys: string[]) => any

/**
 * Represents a single, slash-separated path element of a Datasworn ID.
 * @template Origin The object type of the starting point of this path element.
 */
abstract class PathSymbol<Origin, Key extends keyof Origin = keyof Origin> {
	readonly inProperty: Key
	abstract get pattern(): RegExp

	abstract clone(...args): this

	constructor(inProperty: Key) {
		this.inProperty = inProperty
	}
}

namespace PathSymbol {
	export class RulesPackage extends PathSymbol<null> {
		get pattern() {
			return Pattern.RulesPackageElement
		}

		constructor() {
			// @ts-expect-error
			super(null)
		}

		clone() {
			return new PathSymbol.RulesPackage() as this
		}
	}

	export class DictKey<
		Origin,
		Prop extends DictPropKeyIn<Origin>
	> extends PathSymbol<Origin, Prop> {
		public get minReps(): number {
			return CONST.RECURSIVE_PATH_ELEMENTS_MIN
		}

		public get maxReps(): number {
			return CONST.RECURSIVE_PATH_ELEMENTS_MIN
		}

		get pattern() {
			return Pattern.DictKeyElement
		}

		clone() {
			return new DictKey<Origin, Prop>(this.inProperty) as this
		}

		static get stringTemplateLiteral() {
			// eslint-disable-next-line no-template-curly-in-string
			return '${string}'
		}

		static repsStringTemplateLiteral(min: number, max: number) {
			let variantsToGenerate = max - min + 1

			const variants: string[] = []

			while (variantsToGenerate > 0) {
				const variantParts: string[] = []

				for (let i = 0; i < variantsToGenerate; i++)
					variantParts.push(DictKey.stringTemplateLiteral)

				variants.push(variantParts.join(CONST.PathSep))

				variantsToGenerate--
			}
			return variants
		}

		static repsRegex(min: number, max?: number): RegExp {
			let minMax: string

			switch (true) {
				case min === 1 && max === 1:
					return Pattern.DictKeyElement
				case typeof max !== 'number':
				case max === min:
					minMax = `{${min}}`
					break
				default:
					minMax = `{${min},${max}}`
					break
			}

			const src = `(?:${IdPattern.PathSep}${Pattern.DictKeyElement.source})${minMax}`

			return new RegExp(src)
		}

		static reduceReps(...dictKeys: DictKey<any, any>[]) {
			const min = dictKeys.reduce((a, b) => a + b.minReps, 0)
			const max = dictKeys.reduce((a, b) => a + b.maxReps, 0)
			return { min, max }
		}
	}

	export class RecursiveDictKeys<
		Origin,
		Prop extends DictPropKeyIn<Origin>,
		RecursiveProp extends DictPropKeyIn<EntryInProp<Origin, Prop>>
	> extends DictKey<Origin, Prop> {
		readonly recursiveProperty: RecursiveProp

		override get pattern() {
			return Pattern.RecursiveDictKeysElement
		}

		override get minReps() {
			return CONST.RECURSIVE_PATH_ELEMENTS_MIN
		}

		override get maxReps() {
			return CONST.RECURSIVE_PATH_ELEMENTS_MAX
		}

		constructor(inProperty: Prop, recursiveProperty: RecursiveProp) {
			super(inProperty)
			this.recursiveProperty = recursiveProperty
		}

		clone<
			CloneProp extends DictPropKeyIn<Origin> = Prop,
			CloneRecursiveProp extends DictPropKeyIn<
				EntryInProp<Origin, Prop>
			> = RecursiveProp
		>() {
			// @ts-expect-error
			return new RecursiveDictKeys<Origin, CloneProp, CloneRecursiveProp>(
				this.inProperty,
				this.recursiveProperty
			) as this
		}
	}

	export class Index<
		Origin,
		Key extends ArrayPropKeyIn<Origin>
	> extends PathSymbol<Origin, Key> {
		clone() {
			return new Index<Origin, Key>(this.inProperty) as this
		}

		override get pattern() {
			return Pattern.IndexElement
		}
	}
}

/**
 * Represents a complete Datasworn ID, consisting of one or more type prefixes
 * @template CurrentNode The type of the current (last) node in an IdPattern. Used to provide typechecks for keys when chaining `add` methods.
 */
class IdPattern<
	CurrentNode = Datasworn.RulesPackage
> extends Array<PathFormat> {
	static readonly PathTypeSep = '\\' + CONST.PathTypeSep

	static readonly PrefixSep = CONST.PrefixSep

	static readonly PathSep = '\\' + CONST.PathSep

	/**
	 * Get the left side of the ID pattern: the type prefix.
	 * @example `oracle_rollable`
	 * @example `move_category`
	 * @example `asset.ability.move`
	 */
	getLeftSide(): RegExp {
		return new RegExp(
			this.map(({ typeId }) => typeId).join(IdPattern.PathTypeSep)
		)
	}

	/**
	 * Get the right hand side of the ID pattern: the path.
	 * @example `starforged/core/action`
	 * @example `classic/suffer`
	 * @example `classic/ritual/commune.0.commune`
	 */
	getRightSide(groups: RegexGroupType = 'named_capture_group'): RegExp {
		const result = this.map((part) => part.toRegexSource(groups)).join(
			IdPattern.PathTypeSep
		)

		return new RegExp(result)
	}

	/**
	 * Return a new copy of this IdPattern.
	 * @param primaryTypeId An optional override for the typeId of the *last* PathFormat.
	 */
	clone(primaryTypeId?: string) {
		return new IdPattern(
			...this.map((el, i, arr) =>
				typeof primaryTypeId === 'string' && i === arr.length - 1
					? el.clone(primaryTypeId)
					: el.clone()
			)
		) as this
	}

	get primaryTypeId() {
		return this.at(-1)?.typeId ?? null
	}

	get current() {
		return (this.at(-1) as PathFormat<CurrentNode>) ?? null
	}

	addNewTypeGroup(typeId: string) {
		this.push(new PathFormat(typeId))
		return this
	}

	addDictKey<Key extends DictPropKeyIn<CurrentNode>>(inProperty: Key) {
		this.current.addDictKey(inProperty)
		return this as IdPattern<CurrentNode[Key][keyof CurrentNode[Key]]>
	}

	addRecursiveDictKeys<
		Prop extends DictPropKeyIn<CurrentNode>,
		RecursiveProp extends DictPropKeyIn<
			CurrentNode[Prop][keyof CurrentNode[Prop]]
		>
	>(property: Prop, recursiveProperty: RecursiveProp) {
		this.current.addRecursiveDictKeys(property, recursiveProperty)
		return this as IdPattern<EntryInProp<CurrentNode, Prop>>
	}

	addIndex<Prop extends ArrayPropKeyIn<CurrentNode>>(inProperty: Prop) {
		this.current.addIndex<Prop>(inProperty)

		return this as IdPattern<EntryInProp<CurrentNode, Prop>>
	}

	toRegex(
		lineDelimiters = false,
		groups: RegexGroupType = 'named_capture_group'
	) {
		const base =
			this.getLeftSide().source +
			IdPattern.PrefixSep +
			this.getRightSide(groups).source
		if (lineDelimiters) return new RegExp('^' + base + '$')
		return new RegExp(base)
	}

	toSchema() {}

	static fromRoot(typeId: string) {
		const f = new PathFormat(typeId, true)
		return new IdPattern(f)
	}

	constructor(...formats: PathFormat[]) {
		super()
		this.push(...formats)
	}

	static createNonCollectable<T extends NodeTypeId.NonCollectable>(
		typeId: T,
		typeRoot: NodeTypeId.RootKey<T>
	) {
		return IdPattern.fromRoot(typeId).addDictKey(typeRoot) as IdPattern<
			DataswornNode.ByType<T>
		>
	}

	static createRecursiveCollection<T extends NodeTypeId.Collection.Recursive>(
		typeId: T,
		typeRoot: NodeTypeId.RootKey<T>
	) {
		return (
			IdPattern.fromRoot(typeId)
				// @ts-expect-error this happens because not all union members of OracleCollection have the 'collections' property
				.addRecursiveDictKeys(typeRoot, 'collections') as IdPattern<
				DataswornNode.ByType<T>
			>
		)
	}

	static createRecursiveCollectable<T extends NodeTypeId.Collectable.Recursive>(
		typeId: T,
		typeRoot: NodeTypeId.RootKey<T>
	) {
		return (
			IdPattern.fromRoot(typeId)
				// @ts-expect-error
				.addRecursiveDictKeys(typeRoot, 'collections')
				// @ts-expect-error
				.addDictKey('contents') as IdPattern<DataswornNode.ByType<T>>
		)
	}

	static createNonRecursiveCollection<
		T extends NodeTypeId.Collection.NonRecursive
	>(typeId: T, typeRoot: NodeTypeId.RootKey<T>) {
		return IdPattern.fromRoot(typeId).addDictKey(typeRoot) as IdPattern<
			DataswornNode.ByType<T>
		>
	}

	static createNonRecursiveCollectable<
		T extends NodeTypeId.Collectable.NonRecursive
	>(typeId: T, typeRoot: NodeTypeId.RootKey<T>) {
		return (
			IdPattern.fromRoot(typeId)
				.addDictKey(typeRoot)
				// @ts-expect-error not totally sure why this one gripes tho
				.addDictKey('contents') as IdPattern<DataswornNode.ByType<T>>
		)
	}
}

/**
 * Represents a slash-separated path in a Datasworn ID.
 * @template Origin The object type of the origin for this path.
 */
class PathFormat<Origin = Datasworn.RulesPackage> extends Array<
	PathSymbol<any>
> {
	typeId: string

	get #patterns() {
		return this.map(({ pattern }) => pattern.source)
	}

	toRegexSource(group?: RegexGroupType) {
		let base = ''
		let dictKeys: PathSymbol.DictKey<any, any>[] = []

		for (let i = 0; i < this.length; i++) {
			const part = this[i]
			const nextPart = this[i + 1]

			switch (true) {
				case part instanceof PathSymbol.RulesPackage:
					// no separator needed -- it's at the start
					base += part.pattern.source
					break
				case part instanceof PathSymbol.DictKey &&
					nextPart instanceof PathSymbol.DictKey:
					// DictKey chain not done; grab the current one and continue
					dictKeys.push(part)
					break
				case part instanceof PathSymbol.DictKey &&
					!(nextPart instanceof PathSymbol.DictKey): {
					// end of this DictKey chain; assemble complete DictKey string, and reset array
					dictKeys.push(part)
					const { min, max } = PathSymbol.DictKey.reduceReps(...dictKeys)
					const toAppend = PathSymbol.DictKey.repsRegex(min, max).source
					if (!toAppend.startsWith('(?:\\/')) base += IdPattern.PathSep
					base += toAppend
					dictKeys = []
					break
				}
				default:
					// standard handling
					base += IdPattern.PathSep
					base += part.pattern.source
					break
			}
		}

		switch (group) {
			case 'capture_group':
				return `(${base})`
			case 'non_capturing_group':
				return `(?:${base})`
			case 'named_capture_group':
				return `(?<${this.typeId}>${base})`
			case 'none':
			default:
				return base
		}
	}

	readonly relative: boolean

	constructor(typeId: string, relative = false) {
		super()
		if (relative) this.push(new PathSymbol.RulesPackage())
		this.relative = relative
		this.typeId = typeId
	}

	clone(newTypeId?: string) {
		const clone = new PathFormat(newTypeId ?? this.typeId, this.relative)
		for (const part of this) {
			if (part instanceof PathSymbol.RulesPackage) continue
			clone.push(part.clone())
		}
		return clone as this
	}

	createRelativeAs(newTypeId: string) {
		return new PathFormat(newTypeId, true) as typeof this
	}

	addDictKey<Prop extends DictPropKeyIn<Origin>>(inProperty: Prop) {
		this.push(new PathSymbol.DictKey<Origin, Prop>(inProperty))
		return this as PathFormat<Origin[Prop][keyof Origin[Prop]]>
	}

	addRecursiveDictKeys<
		Prop extends DictPropKeyIn<Origin>,
		RecursiveProp extends DictPropKeyIn<EntryInProp<Origin, Prop>>
	>(property: Prop, recursiveProperty: RecursiveProp) {
		this.push(
			new PathSymbol.RecursiveDictKeys<Origin, Prop, RecursiveProp>(
				property,
				recursiveProperty
			)
		)
		return this as PathFormat<EntryInProp<Origin, Prop>>
	}

	addIndex<Prop extends ArrayPropKeyIn<Origin>>(inProperty: Prop) {
		this.push(new PathSymbol.Index<Origin, Prop>(inProperty))
		return this as PathFormat<EntryInProp<Origin, Prop>>
	}
}

const asset = IdPattern.fromRoot('asset')
	.addDictKey('assets')
	.addDictKey('contents') satisfies IdPattern<Datasworn.Asset>
const assetAbility = asset
	.clone()
	.addNewTypeGroup('ability')
	.addIndex('abilities') satisfies IdPattern<Datasworn.AssetAbility>
const assetAbilityMove = assetAbility
	.clone()
	.addNewTypeGroup('move')
	.addDictKey('moves') satisfies IdPattern<Datasworn.Move>
const oracleCollection = IdPattern.fromRoot(
	'oracle_collection'
).addRecursiveDictKeys(
	'oracles',
	'collections'
) satisfies IdPattern<Datasworn.OracleCollection>

const oracleRollable = oracleCollection
	.clone('oracle_rollable')
	.addDictKey('contents')

const moveCategory = IdPattern.fromRoot('move_collection').addDictKey(
	'moves'
) satisfies IdPattern<Datasworn.MoveCategory>

const move = moveCategory
	.clone()
	.addDictKey('contents') satisfies IdPattern<Datasworn.Move>

console.log(asset.toRegex())
console.log(assetAbility.toRegex())
console.log(assetAbilityMove.toRegex())
console.log(oracleCollection.toRegex())
console.log(oracleRollable.toRegex())
console.log(PathSymbol.DictKey.repsStringTemplateLiteral(1, 3))
