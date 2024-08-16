/** Override type for typescript code generation. */
export const Typescript = Symbol('Typescript')

/** Hints type relationships between schemata. */
export const Extends = Symbol('Extends')

/** Use with SchemaOptions to hint/override JTD generation. */
export const JsonTypeDef = Symbol('JsonTypeDef')
/** Hints discriminator key for DiscriminatedUnion schemata  */
export const Discriminator = Symbol('Discriminator')
/** Stores references to the member schema in a discriminated union */
export const Members = Symbol('Members')
/** Stores references to the member schema in a discriminated union */
export const Mapping = Symbol('Mapping')

/** A less complex alternate version of the schema for use with code generation tools. */
export const Simplify = Symbol('Simplify')

/**
 * Details type inheritance for use in code generation.
 */
export const Inherits = Symbol('Inherits')

/**
 * Sets the namespace/module name for use in code generation.
 */
export const Namespace = Symbol('Namespace')

/** Marks a property as being inherited from another schema. */
export const InheritedFrom = Symbol('InheritedFrom')
