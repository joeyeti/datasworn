export const VERSION = '0.1.0' as const
export type VERSION = typeof VERSION

/** The maximum depth for nesting collections, relative to the root dictionary for its type */
export const COLLECTION_DEPTH_MAX = 4 as const
export type COLLECTION_DEPTH_MAX = typeof COLLECTION_DEPTH_MAX
export const COLLECTION_DEPTH_MIN = 1 as const
export type COLLECTION_DEPTH_MIN = typeof COLLECTION_DEPTH_MIN
export const MdLinkPrefix = 'datasworn' as const
export type MdLinkPrefix = typeof MdLinkPrefix

/** The separator character for Datasworn IDs. */
export const PathKeySep = '/' as const
export type PathKeySep = typeof PathKeySep

export const TypeSep = '.' as const
export type TypeSep = typeof TypeSep

export const PrefixSep = ':' as const
export type PrefixSep = typeof PrefixSep

/** The wildcard character for Datasworn IDs that matches any key in a dictionary object. */
export const WildcardString = '*' as const
export type WildcardString = typeof WildcardString

/** A globstar (recursive wildcard) representing any number of levels of in recursive collections. */
export const GlobstarString = '**' as const
export type GlobstarString = typeof GlobstarString

/** Key in Collection that contains a dictionary object of child collections. */
export const CollectionsKey = 'collections'
export type CollectionsKey = typeof CollectionsKey

/** Key in Collection that contains a dictionary object of collectable items. */
export const ContentsKey = 'contents' as const
export type ContentsKey = typeof ContentsKey

/** Key in Collection that specifies other collections that the Collection should be merged in to.  */
export const EnhancesKey = 'enhances' as const
export type EnhancesKey = typeof EnhancesKey

/** Key in primary node that specifies other nodes replaced by this object. */
export const ReplacesKey = 'replaces' as const
export type ReplacesKey = typeof ReplacesKey

export const IdKey = '_id' as const
export type IdKey = typeof IdKey

export const SourceInfoKey = '_source' as const
export type SourceInfoKey = typeof SourceInfoKey
