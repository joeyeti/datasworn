"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataswornKeyOrder = exports.sourceMetadataKeys = exports.rulesKeys = exports.numericKeys = exports.longArrayKeys = exports.longDescriptionKeys = exports.shortDescriptionKeys = exports.usageKeys = exports.discriminatorKeys = exports.relationshipKeys = exports.idKeys = exports.unsortableKeys = void 0;
exports.compareObjectKeys = compareObjectKeys;
exports.sortDataswornKeys = sortDataswornKeys;
exports.sortJson = sortJson;
exports.sortObjectKeys = sortObjectKeys;
const CONST_js_1 = require("../IdElements/CONST.js");
const Pattern_js_1 = __importDefault(require("../IdElements/Pattern.js"));
exports.unsortableKeys = [
    'columns',
    'controls',
    CONST_js_1.ContentsKey,
    'options',
    CONST_js_1.CollectionsKey,
    'choices'
];
exports.idKeys = [CONST_js_1.IdKey, '_key', '_index'];
exports.relationshipKeys = [
    CONST_js_1.ReplacesKey,
    CONST_js_1.EnhancesKey,
    'oracle',
    'asset',
    'region',
    'theme',
    'domain',
    'name_oracle',
    'npc',
    'extra_card'
];
// TODO: this could be done programmatically by looking at the appropriate symbol key on DiscriminatedUnion schemas
exports.discriminatorKeys = [
    'type',
    'category',
    'field_type',
    'roll_type',
    'choice_type',
    'oracle_type',
    'value_type',
    'using'
];
exports.usageKeys = [
    'auto',
    'duplicates',
    'number_of_rolls',
    'by',
    'method',
    'roll_options',
    'ally',
    'player',
    'is_impact',
    'disables_asset'
];
exports.shortDescriptionKeys = [
    'result',
    'summary',
    'detail',
    'requirement',
    'features',
    'dangers',
    'drives',
    'tactics'
];
exports.longDescriptionKeys = [
    'text',
    'text2',
    'text3',
    'description',
    'your_character'
];
exports.longArrayKeys = [
    'denizens',
    'enhance_moves',
    'rows',
    'table'
];
exports.numericKeys = ['min', 'max', 'value', 'rank'];
exports.rulesKeys = [
    // top level
    'condition_meters',
    'stats',
    'impacts',
    'special_tracks',
    // properties
    'rollable',
    'prevents_recovery',
    'permanent',
    'optional',
    'control',
    'option',
    'condition_meter',
    'stat',
    'tracks',
    'conditions',
    'recover',
    'suffer',
    'choices',
    'xp_cost'
];
exports.sourceMetadataKeys = [
    'email',
    'authors',
    'date',
    'license',
    'page',
    'title',
    'url'
];
exports.dataswornKeyOrder = [
    ...exports.idKeys,
    'datasworn_version',
    'type',
    'ruleset',
    'title',
    'name',
    'canonical_name',
    'label',
    ...exports.discriminatorKeys,
    ...exports.sourceMetadataKeys,
    'rules',
    ...exports.rulesKeys,
    ...exports.relationshipKeys,
    ...exports.numericKeys,
    'nature',
    'color',
    'icon',
    'images',
    'track',
    'dice',
    'enabled',
    'frequency',
    'options',
    'count_as_impact',
    ...exports.usageKeys,
    'shared',
    'attachments',
    'trigger',
    'roll',
    ...exports.shortDescriptionKeys,
    'strong_hit',
    'weak_hit',
    'miss',
    'variants',
    ...exports.longDescriptionKeys,
    'abilities',
    'template',
    'rolls',
    CONST_js_1.ContentsKey,
    CONST_js_1.CollectionsKey,
    'outcomes',
    'quest_starter',
    'your_truth',
    'controls',
    'date',
    'page',
    'authors',
    'license',
    'url',
    'embed_table',
    'match',
    'recommended_rolls',
    // relationships
    'oracles',
    'suggestions',
    'enhance_asset',
    'oracle_rolls',
    'tags',
    '_comment',
    // so it appears immediately above rows
    'column_labels',
    // very long content
    ...exports.longArrayKeys,
    'assets',
    'atlas',
    'moves',
    'npcs',
    'rarities',
    'delve_sites',
    'site_domains',
    'site_themes',
    'truths',
    '_source',
    '_i18n'
];
function compareObjectKeys(a, b, keyOrder = [], unsortableKeys) {
    const [indexA, indexB] = [a, b].map((key) => {
        const index = keyOrder.indexOf(key);
        if (unsortableKeys != null && index === -1)
            // logger.warn(`key ${key} has not been assigned a sort order.`)
            unsortableKeys.add(key);
        return index;
    });
    // this shouldn't happen; but if a and b are the same, fall back to alphabetical order.
    if (indexA === indexB)
        return a.localeCompare(b, 'en-US');
    // if one key lacks an explicit sort, place it last
    if (indexA === -1)
        return 1;
    if (indexB === -1)
        return -1;
    return indexA - indexB;
}
function sortDataswornKeys(value) {
    return sortObjectKeys(value, exports.dataswornKeyOrder);
}
function _isPOJO(value) {
    if (typeof value !== 'object')
        return false;
    if (value === null)
        return false;
    if (Array.isArray(value))
        return false;
    return true;
}
function _isIdNode(value) {
    if (!_isPOJO(value))
        return false;
    if (!(CONST_js_1.IdKey in value))
        return false;
    const id = value[CONST_js_1.IdKey];
    return typeof id === 'string';
}
function _isDictionaryOfPOJOs(value) {
    if (!_isPOJO(value))
        return false;
    for (const k in value) {
        if (!Pattern_js_1.default.DictKey.test(k))
            return false;
        const dict_entry = value[k];
        if (!_isPOJO(dict_entry))
            return false;
    }
    return true;
}
function _isDictionaryOfIdNodes(value) {
    if (!_isPOJO(value))
        return false;
    for (const k in value) {
        if (!Pattern_js_1.default.DictKey.test(k))
            return false;
        const dict_entry = value[k];
        if (!_isIdNode(dict_entry))
            return false;
    }
    return true;
}
function _sortObject(key, value) {
    if (_isDictionaryOfPOJOs(value))
        return value;
}
const sortBlacklist = [
    'options',
    'controls',
    'contents',
    'collections',
    'oracles',
    'assets',
    'moves',
    'variants'
];
function sortJson(key, value) {
    if (sortBlacklist.includes(key))
        return value;
    if (!_isPOJO(value))
        return value;
    if (_isDictionaryOfIdNodes(value))
        return value;
    return sortDataswornKeys(value);
}
function sortObjectKeys(object, keyOrder) {
    const entries = Object.entries(object).sort(([a], [b]) => compareObjectKeys(a, b, keyOrder));
    return Object.fromEntries(entries);
}
