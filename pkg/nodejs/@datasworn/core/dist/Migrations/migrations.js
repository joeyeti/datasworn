"use strict";
/** Utilties to assist in migration of Datasworn data across versions. */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateId = exports.updateIdsInMarkdown = exports.updateIdsInString = exports.idReplacers = void 0;
const CONST_js_1 = __importDefault(require("../IdElements/CONST.js"));
const TypeId_js_1 = __importDefault(require("../IdElements/TypeId.js"));
const index_js_1 = require("../IdElements/index.js");
const legacyTypeMap = {
    // new_type: 'old_type'
    asset: 'assets',
    move: 'moves',
    atlas_entry: 'atlas',
    npc: 'npcs',
    oracle_rollable: 'oracles',
    delve_site: 'delve_sites',
    truth: 'truths',
    delve_site_domain: 'site_domains',
    delve_site_theme: 'site_themes',
    rarity: 'rarities',
    oracle_collection: 'collections/oracles',
    npc_collection: 'collections/npcs',
    asset_collection: 'collections/assets',
    move_category: 'collections/moves',
    atlas_collection: 'collections/atlas'
};
const keyRenamesByPkgAndType = {
    starforged: {
        // these will cascade down to any child collectables, too
        oracle_collection: {
            // new_key: 'old_key'
            'derelict/zone': 'derelicts/zones',
            faction: 'factions',
            derelict: 'derelicts',
            location_theme: 'location_themes',
            planet: 'planets',
            settlement: 'settlements',
            starship: 'starships',
            precursor_vault: 'vaults',
            character: 'characters',
            creature: 'creatures'
        },
        oracle_rollable: { 'name/given_name': 'name/given' }
    },
    classic: {},
    delve: {}
};
function createKeyRenamersForType(typeId) {
    var _a;
    const oldType = ((_a = legacyTypeMap[typeId]) !== null && _a !== void 0 ? _a : legacyTypeMap[typeId]);
    const renamers = [];
    const { min, max } = getPathKeyCount(typeId);
    for (const pkgId in keyRenamesByPkgAndType) {
        const pkgRenames = keyRenamesByPkgAndType[pkgId];
        if (typeId in pkgRenames) {
            const typeRenames = pkgRenames[typeId];
            for (const newKey in typeRenames) {
                const oldKey = typeRenames[newKey];
                // all of them have at least one, we're just worried keys in excess of that
                const [key, ...extraKeys] = oldKey.split('/');
                const minLeadingKeys = Math.max(0, min - extraKeys.length - 1);
                const maxLeadingKeys = Math.max(0, max - extraKeys.length - 1);
                renamers.push({
                    old: RegExp(`^${pkgId}/${oldType}/${oldKey}((?:\\/[a-z_/*\\d]+){${minLeadingKeys},${maxLeadingKeys}})$`),
                    new: `${typeId}${CONST_js_1.default.PrefixSep}${pkgId}${CONST_js_1.default.PathKeySep}${newKey}$1`
                });
            }
        }
        const collectionTypeId = index_js_1.TypeGuard.CollectableType(typeId)
            ? TypeId_js_1.default.getCollectionOf(typeId)
            : null;
        // generate renames for Collectable descendents of renamed collections
        if (collectionTypeId in pkgRenames) {
            const collectionTypeRenames = pkgRenames[collectionTypeId];
            for (const newKey in collectionTypeRenames) {
                const oldKey = collectionTypeRenames[newKey];
                const [key, ...extraKeys] = oldKey.split('/');
                const minTrailingKeys = Math.max(0, min - extraKeys.length - 1);
                const maxTrailingKeys = Math.max(0, max - extraKeys.length - 1);
                renamers.push({
                    old: RegExp(
                    // migrated key goes at the end
                    `^${pkgId}/${oldType}/${oldKey}((?:\\/[a-z_/*\\d]+){${minTrailingKeys},${maxTrailingKeys}})$`),
                    new: `${typeId}${CONST_js_1.default.PrefixSep}${pkgId}${CONST_js_1.default.PathKeySep}${newKey}$1`
                });
            }
        }
    }
    return renamers;
}
/** Get the expected number of path key elements for a v0.0.10 ID being converted to this type  */
function getPathKeyCount(typeId) {
    let min, max;
    switch (typeId) {
        case 'oracle_collection': // recursive collections
        case 'atlas_collection':
        case 'npc_collection':
            min = 1;
            max = 3;
            break;
        case 'oracle_rollable': // recursive collectables
        case 'atlas_entry':
        case 'npc':
            min = 2;
            max = 3;
            break;
        case 'asset_collection': // nonrecursive collections
        case 'move_category':
        case 'delve_site': // noncollectables
        case 'delve_site_domain':
        case 'delve_site_theme':
        case 'rarity':
        case 'truth':
            min = 1;
            max = 1;
            break;
        case 'asset': // nonrecursive collectables
        case 'move':
        case 'option': // embedded types in noncollectables
        case 'feature':
        case 'danger':
        case 'denizen':
            min = 2;
            max = 2;
            break;
        case 'ability': // embedded type in nonrecursive collectables
            min = 3;
            max = 3;
            break;
        case 'row':
            min = 3;
            max = 4;
            break;
    }
    return { min, max };
}
function getAncestorKeyCount(typeId) {
    let { min, max } = getPathKeyCount(typeId);
    min--;
    max--;
    return { min, max };
}
function createIdMappers(typeId) {
    var _a;
    const oldType = ((_a = legacyTypeMap[typeId]) !== null && _a !== void 0 ? _a : legacyTypeMap[typeId]);
    const { min, max } = getPathKeyCount(typeId);
    const pathKeyCount = `{${min},${max}}`;
    const mappers = [];
    // these mappers are more specific, so they go first
    if (index_js_1.TypeGuard.PrimaryType(typeId))
        mappers.push(...createKeyRenamersForType(typeId));
    // most generic possible renamer. only applies if no others match
    mappers.push({
        old: new RegExp(`^(\\*|[a-z][a-z0-9_]{3,})/${oldType}((?:\\/[a-z_/*\\d]+)${pathKeyCount})$`),
        new: `${typeId}${CONST_js_1.default.PrefixSep}$1$2`
    });
    return mappers;
}
function createMoveOracleIdMapper(rulesPackage, moveCategoryKey, moveKey, newOracleKey = moveKey, oldOracleKey) {
    const newTypeId = ['move', 'oracle_rollable'].join(CONST_js_1.default.TypeSep);
    const newMovePath = [rulesPackage, moveCategoryKey, moveKey].join(CONST_js_1.default.PathKeySep);
    const newFullPath = [newMovePath, newOracleKey].join(CONST_js_1.default.TypeSep);
    return {
        old: new RegExp(`^${rulesPackage}/oracles/moves/${moveKey}${oldOracleKey ? '/' + oldOracleKey : ''}$`),
        new: [newTypeId, newFullPath].join(CONST_js_1.default.PrefixSep)
    };
}
/**
 * Provides an array of {@link IdReplacer} objects for each Datasworn ID type.
 */
exports.idReplacers = {
    // set highest priority replacments first
    oracle_rollable: [
        {
            old: /^starforged\/oracles\/characters\/name\/given$/,
            new: 'oracle_rollable:starforged/character/name/given_name'
        },
        ...['starforged', 'classic'].flatMap((pkg) => [
            createMoveOracleIdMapper(pkg, 'suffer', 'endure_harm'),
            createMoveOracleIdMapper(pkg, 'suffer', 'endure_stress'),
            createMoveOracleIdMapper(pkg, 'fate', 'pay_the_price'),
            ...[
                'almost_certain',
                'likely',
                'fifty_fifty',
                'unlikely',
                'small_chance'
            ].map((k) => createMoveOracleIdMapper(pkg, 'fate', 'ask_the_oracle', k, k))
        ]),
        createMoveOracleIdMapper('delve', 'delve', 'delve_the_depths', 'edge', 'edge'),
        createMoveOracleIdMapper('delve', 'delve', 'delve_the_depths', 'wits', 'wits'),
        createMoveOracleIdMapper('delve', 'delve', 'delve_the_depths', 'shadow', 'shadow'),
        createMoveOracleIdMapper('delve', 'delve', 'find_an_opportunity'),
        createMoveOracleIdMapper('delve', 'delve', 'reveal_a_danger'),
        createMoveOracleIdMapper('delve', 'delve', 'reveal_a_danger_alt'),
        createMoveOracleIdMapper('delve', 'threat', 'advance_a_threat'),
        createMoveOracleIdMapper('starforged', 'session', 'begin_a_session'),
        createMoveOracleIdMapper('starforged', 'exploration', 'make_a_discovery'),
        createMoveOracleIdMapper('starforged', 'exploration', 'confront_chaos'),
        createMoveOracleIdMapper('starforged', 'combat', 'take_decisive_action'),
        createMoveOracleIdMapper('starforged', 'suffer', 'withstand_damage')
    ],
    oracle_collection: [
        {
            old: /^(\*|[a-z][a-z0-9_]{3,})\/collections\/oracles\/moves(\/(?:\*|[a-z][a-z_]*)){0,2}$/,
            new: null
        }
    ],
    variant: [
        {
            // npc variants
            old: /^(\*|[a-z][a-z0-9_]{3,})\/npcs((?:\/(?:\*|[a-z][a-z_]*)){2,4})\/variants\/(\*|[a-z][a-z_]*)$/,
            new: 'npc.variant:$1$2.$3'
        }
    ],
    ability: [
        {
            // asset abilities
            old: /^(\*|[a-z][a-z0-9_]{3,})\/assets\/((?:\*|[a-z][a-z_]*)\/(?:\*|[a-z][a-z_]*))\/abilities\/(\*|\d+)$/,
            new: 'asset.ability:$1/$2.$3'
        }
    ],
    move: [
        {
            // asset ability moves
            old: /^(\*|[a-z][a-z0-9_]{3,})\/assets\/((?:\*|[a-z][a-z_]*)\/(?:\*|[a-z][a-z_]*))\/abilities\/(\*|\d+)\/moves\/(\*|[a-z][a-z_]*)$/,
            new: 'asset.ability.move:$1/$2.$3.$4'
        }
    ]
};
for (const typeId in legacyTypeMap) {
    exports.idReplacers[typeId] || (exports.idReplacers[typeId] = []);
    exports.idReplacers[typeId].push(...createIdMappers(typeId));
}
// console.log(idReplacers)
/**
 * Updates old (pre-0.1.0) Datasworn IDs (and pointers that reference them in markdown strings) for use with v0.1.0.
 * Intended for use as the `replacer` in {@link JSON.stringify} or the `reviver` in {@link JSON.parse}; this way, it will iterate over every string value so you can update all the IDs in one go.
 *
 * NOTE: This function assumes that Datasworn's markdown formatting is mostly intact. If you diverge,
 *
 * @param key The JSON value's key. Not actually used right now, but retained so it's parameters are consistent with the typical replacer/reviver functions.
 * @param value The JSON value itself.
 * @returns The updated string value, or the original string value if no changes were made.
 * @example ```typescript
 * // Read old data asynchronously
 * const oldJson = await fs.readFile('./path/to/old_datasworn_data.json')
 * // parse and do ID replacements
 * const updated = JSON.parse(oldJson, updateIdsInString)
 * ```
 */
function updateIdsInString(key, value) {
    const str = value;
    switch (true) {
        // *all* relevant IDs include this character;
        // strings without them can be safely ignored.
        // won't match a RulesPackageId, but we don't
        // care about them.
        case typeof value !== 'string':
        case !str.includes(CONST_js_1.default.PathKeySep):
            return value;
        // implies a markdown ID reference.
        case str.includes('['):
        case str.includes('{{'):
            return updateIdsInMarkdown(value);
        // if it's come this far, it's either
        // * a complete ID
        // * a string with a plain text separator character
        // only the former is relevant.
        default:
            return updateId(value);
    }
    // skip if it's not a string
    // skip if it has no slash characters -- all replaced IDs have them
}
exports.updateIdsInString = updateIdsInString;
/**
 * Matches *only* the actual ID.
 * @example "{{text:starforged/oracle_rollable/factions/name/legacy}}"
 */
const markdownMacroPattern = /(?<=\{\{[a-z_]+:)[a-z_\\/\\.\d]+?(?=\}\})/g;
/**
 * Matches *only* the actual ID.
 * @example "[Legacy](id:starforged/oracle_rollable/factions/name/legacy)"
 */
const markdownLinkPattern = /(?<=\[\w.+\]\(id:)[a-z_\\/\\.\d]+?(?=\))/g;
const markdownIdPatterns = [markdownMacroPattern, markdownLinkPattern];
/**
 *
 * @param md The markdown string to change.
 * @returns A new string with the replaced values.
 */
function updateIdsInMarkdown(md) {
    let newStr = md;
    for (const pattern of markdownIdPatterns)
        newStr = newStr.replaceAll(pattern, updateId);
    return newStr;
}
exports.updateIdsInMarkdown = updateIdsInMarkdown;
/**
 * Updates a Datasworn ID. The string must consist *only* of an ID, like those found in the `_id` property of many Datasworn nodes.
 *
 * To update IDs within a longer string, see {@link updateIdsInString}.
 * @param oldId The ID to attempt migration on.
 * @param typeHint An optional type hint. If you know the ID type ahead of time, this lets the function skip some iteration over irrelevant ID categories, which might make it faster.
 */
function updateId(oldId, typeHint) {
    var _a;
    if (typeHint != null && typeHint in exports.idReplacers) {
        // type is already known, so we can skip straight to running the replacements
        const replacers = exports.idReplacers[typeHint];
        return (_a = applyReplacements(oldId, replacers)) !== null && _a !== void 0 ? _a : oldId;
    }
    else {
        // unknown type, run all of them until one sticks
        for (const typeId in exports.idReplacers) {
            const replacers = exports.idReplacers[typeId];
            const newId = applyReplacements(oldId, replacers);
            if (newId == null)
                continue;
            return newId;
        }
    }
    // fall back to old id
    return oldId;
}
exports.updateId = updateId;
/** Applies a replacement from an array of replacer objects to a string; the first matching replacer is used. If no matching replacer is found, returns `null` instead. */
function applyReplacements(str, replacers) {
    for (const replacer of replacers)
        if (replacer.old.test(str))
            return str.replace(replacer.old, replacer.new);
    // if no replacement is found, return null
    return null;
}
