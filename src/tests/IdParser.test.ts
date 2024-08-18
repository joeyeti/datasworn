import { expect, test, describe } from 'bun:test'

import { IdParser } from '../pkg-core/IdParser.js'
import { loadDatasworn } from './loadJson.js'

const { tree, index } = await loadDatasworn()

IdParser.tree = tree

const cases = Array.from(index.keys()).map((id) => [id, IdParser.get(id)._id])

describe('IdParser lookup', () => {
	test.each(cases)('%p', (id, lookupId) => expect(id).toBe(lookupId))
})
