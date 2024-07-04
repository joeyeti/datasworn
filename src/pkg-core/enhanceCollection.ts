import CONST from './IdElements/CONST.js'
import type TypeNode from './TypeNode.js'
// import fs from 'fs-extra'
// import { IdParser, type Datasworn } from './index.js'

// const classic = fs.readJSONSync(
// 	'./pkg/nodejs/@datasworn/ironsworn-classic/json/classic.json'
// ) as Datasworn.Ruleset

// const starforged = fs.readJSONSync(
// 	'./pkg/nodejs/@datasworn/starforged/json/starforged.json'
// ) as Datasworn.Ruleset

// const sundered_isles = fs.readJSONSync(
// 	'./pkg/nodejs/@datasworn/sundered-isles/json/sundered_isles.json'
// ) as Datasworn.Expansion

// const delve = fs.readJSONSync(
// 	'./pkg/nodejs/@datasworn/ironsworn-classic-delve/json/delve.json'
// ) as Datasworn.Expansion

// IdParser.tree = new Map(
// 	[classic, starforged, sundered_isles, delve].map((pkg) => [pkg._id, pkg])
// )

// const collectionId = IdParser.parse('oracle_collection:sundered_isles/**')
// const collectableId = IdParser.parse('oracle_rollable:*/**/peril')

// const collectionResults = Array.from(collectionId.getMatches().keys())
// const collectableResults = Array.from(collectableId.getMatches().keys())

// console.log(collectionResults)
// console.log(collectableResults)

// const f = IdParser.parse('move_category:classic/suffer')

// const fff = IdParser.parse('move:classic/suffer/endure_stress')

// console.log(f.id)
// console.log(fff.id)

// console.log(fff._getUnsafe())

// ) as Datasworn.Ruleset
// const delve = fs.readJSONSync(
// 	'./pkg/nodejs/@datasworn/ironsworn-classic-delve/json/delve.json'
// ) as Datasworn.RulesPackage

// for (const [k, v] of Object.entries(delve.oracles)) {
// 	const updatedCollection =
// 		k in classic.oracles ? enhanceCollection(classic.oracles[k], v) : v
// 	classic.oracles[k] = updatedCollection
// }

// console.log(classic.oracles.character)

/**
 * Applies overrides to Datasworn collection from another Datasworn collection.
 * Mutates `target`.
 * @param target The collection object to be enhanced.
 * @param source The changes to be applied to `target`
 * @param strictOverrides Should enhancements to collections and collectables require a matching `enhances` or `overrides` property? (default: `true`)
 * @returns The mutated `target`
 * @experimental
 */
export function enhanceCollection<T extends TypeNode.Collection>(
	target: T,
	source: T,
	strictOverrides = true
): T {
	if (
		strictOverrides &&
		!('enhances' in source && String(source.enhances) === String(target._id))
	)
		throw new Error(
			'strict mode requires a `enhances` property in the source object; its value must match the ID of the collection being enhanced.'
		)

	// no changes to make -- skip
	if (
		source === undefined ||
		source === null ||
		Object.keys(source).length === 0
	)
		return target

	// no existing data to worry about -- overwrite it
	if (
		target === undefined ||
		target === null ||
		Object.keys(target).length === 0
	)
		return Object.assign(target, source)

	for (const key in source) {
		const newValue = source[key]
		const oldValue = target[key]

		// skip if there's nothing to add
		if (
			newValue === undefined ||
			newValue === null ||
			(newValue instanceof Map && newValue.size === 0) ||
			Object.keys(newValue).length === 0
		)
			continue

		// automatically override the original value if it's empty
		if (
			oldValue === undefined ||
			oldValue === null ||
			(oldValue instanceof Map && oldValue.size === 0) ||
			Object.keys(oldValue).length === 0
		) {
			target[key] = newValue
			continue
		}

		switch (key) {
			// target's id should never be overwritten -- they need to relate to the object's 'real' position or the id lookup won't work.
			case CONST.IdKey:
			case CONST.EnhancesKey:
			case CONST.ReplacesKey:
			case CONST.SourceInfoKey:
				// metadata shouldn't be replicated on the merged tree -- skip
				continue
			case CONST.ContentsKey:
				{
					const sourceChildren: Iterable<[string, unknown]> =
						newValue instanceof Map ? newValue : Object.entries(newValue)

					for (const [childKey, sourceChild] of sourceChildren) {
						if (sourceChild == null) continue

						const oldChild =
							oldValue instanceof Map
								? oldValue.get(childKey)
								: oldValue[childKey]

						const locationId =
							oldChild == null
								? target._id.replace('/collections/', '/') + `/${childKey}`
								: String(oldChild._id)
						const srcId = (sourceChild as any)._id as string

						const updatedChild =
							oldChild == null
								? sourceChild
								: Object.assign(oldChild, sourceChild)

						updatedChild._id = locationId
						if (oldChild == null) updatedChild._inserted_by = srcId
						else updatedChild._replaced_by = srcId

						if (oldValue instanceof Map) oldValue.set(childKey, updatedChild)
						else oldValue[childKey] = updatedChild
					}
				}
				break
			case CONST.CollectionsKey: {
				// child collections are enhanced recursively
				const sourceChildren: Iterable<[string, TypeNode.Collection]> =
					newValue instanceof Map ? newValue : Object.entries(newValue)

				for (const [childKey, sourceChild] of sourceChildren) {
					if (oldValue instanceof Map) {
						const updatedChild = oldValue.has(childKey)
							? enhanceCollection(
									oldValue.get(childKey),
									sourceChild,
									strictOverrides
								)
							: sourceChild
						oldValue.set(childKey, updatedChild)
					} else {
						const updatedChild =
							childKey in (oldValue as Record<string, TypeNode.Collection>)
								? enhanceCollection(
										oldValue[childKey],
										sourceChild,
										strictOverrides
									)
								: sourceChild
						oldValue[childKey] = updatedChild
					}
				}
				break
			}
			default:
				// target[key] = newValue
				break
		}
	}

	return target
}
