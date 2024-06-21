"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CONST;
(function (CONST) {
    /** The maximum depth for nesting collections, relative to the root dictionary for its type */
    CONST.COLLECTION_DEPTH_MAX = 4;
    CONST.COLLECTION_DEPTH_MIN = 1;
    CONST.PACKAGE_ID_LENGTH_MIN = 3;
    /** The separator character for Datasworn IDs. */
    CONST.PathKeySep = '/';
    CONST.TypeSep = '.';
    CONST.PrefixSep = ':';
    /** The wildcard character for Datasworn IDs that matches any key in a dictionary object. */
    CONST.WildcardString = '*';
    /** A globstar (recursive wildcard) representing any number of levels of in recursive collections. */
    CONST.GlobstarString = '**';
    /** Key in Collection that contains a dictionary object of child collections. */
    CONST.CollectionsKey = 'collections';
    /** Key in Collection that contains a dictionary object of collectable items. */
    CONST.ContentsKey = 'contents';
})(CONST || (CONST = {}));
exports.default = CONST;
