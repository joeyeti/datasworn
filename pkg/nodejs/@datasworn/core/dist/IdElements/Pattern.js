"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CONST_js_1 = require("./CONST.js");
/**
 * Regular expressions used to validate Datasworn ID elements.
 */
var Pattern;
(function (Pattern) {
    const DictKeyBase = /[a-z][a-z0-9_]*/;
    Pattern.DictKeyElement = DictKeyBase;
    Pattern.DictKey = new RegExp(`^${DictKeyBase.source}$`);
    const RulesPackageBase = DictKeyBase;
    Pattern.RulesPackageElement = RulesPackageBase;
    Pattern.RulesPackageId = new RegExp(`^${RulesPackageBase.source}$`);
    Pattern.IndexElement = /\d+/;
    const RecursiveDictKeysBase = new RegExp(`${DictKeyBase.source}(?:\\${CONST_js_1.PathKeySep}${DictKeyBase.source}){${CONST_js_1.COLLECTION_DEPTH_MIN - 1},${CONST_js_1.COLLECTION_DEPTH_MAX - 1}}`);
    Pattern.RecursiveDictKeysElement = RecursiveDictKeysBase;
})(Pattern || (Pattern = {}));
exports.default = Pattern;
