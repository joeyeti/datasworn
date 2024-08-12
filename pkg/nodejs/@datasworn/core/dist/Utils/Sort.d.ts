export declare const unsortableKeys: readonly ["columns", "controls", "contents", "options", "collections", "choices"];
export declare const idKeys: readonly ["_id", "_key", "_index"];
export declare const relationshipKeys: readonly ["replaces", "enhances", "oracle", "asset", "region", "theme", "domain", "name_oracle", "npc", "extra_card"];
export declare const discriminatorKeys: readonly ["type", "category", "field_type", "roll_type", "choice_type", "oracle_type", "value_type", "using"];
export declare const usageKeys: readonly ["auto", "duplicates", "number_of_rolls", "by", "method", "roll_options", "ally", "player", "is_impact", "disables_asset"];
export declare const shortDescriptionKeys: readonly ["result", "summary", "detail", "requirement", "features", "dangers", "drives", "tactics"];
export declare const longDescriptionKeys: readonly ["text", "text2", "text3", "description", "your_character"];
export declare const longArrayKeys: readonly ["denizens", "enhance_moves", "rows", "table"];
export declare const numericKeys: readonly ["min", "max", "value", "rank"];
export declare const rulesKeys: readonly ["condition_meters", "stats", "impacts", "special_tracks", "rollable", "prevents_recovery", "permanent", "optional", "control", "option", "condition_meter", "stat", "tracks", "conditions", "recover", "suffer", "choices", "xp_cost"];
export declare const sourceMetadataKeys: ["email", "authors", "date", "license", "page", "title", "url"];
export declare const dataswornKeyOrder: ["_id", "_key", "_index", "datasworn_version", "type", "ruleset", "title", "name", "canonical_name", "label", "type", "category", "field_type", "roll_type", "choice_type", "oracle_type", "value_type", "using", "email", "authors", "date", "license", "page", "title", "url", "rules", "condition_meters", "stats", "impacts", "special_tracks", "rollable", "prevents_recovery", "permanent", "optional", "control", "option", "condition_meter", "stat", "tracks", "conditions", "recover", "suffer", "choices", "xp_cost", "replaces", "enhances", "oracle", "asset", "region", "theme", "domain", "name_oracle", "npc", "extra_card", "min", "max", "value", "rank", "nature", "color", "icon", "images", "track", "dice", "enabled", "frequency", "options", "count_as_impact", "auto", "duplicates", "number_of_rolls", "by", "method", "roll_options", "ally", "player", "is_impact", "disables_asset", "shared", "attachments", "trigger", "roll", "result", "summary", "detail", "requirement", "features", "dangers", "drives", "tactics", "strong_hit", "weak_hit", "miss", "variants", "text", "text2", "text3", "description", "your_character", "abilities", "template", "rolls", "contents", "collections", "outcomes", "quest_starter", "your_truth", "controls", "date", "page", "authors", "license", "url", "embed_table", "match", "recommended_rolls", "column_labels", "oracles", "suggestions", "enhance_asset", "oracle_rolls", "tags", "_comment", "denizens", "enhance_moves", "rows", "table", "assets", "atlas", "moves", "npcs", "rarities", "delve_sites", "site_domains", "site_themes", "truths", "_source", "_i18n"];
export declare function compareObjectKeys(a: string, b: string, keyOrder?: Readonly<string[]>, unsortableKeys?: Set<string>): number;
export declare function sortDataswornKeys(value: Record<string, unknown>): Record<string, unknown>;
export declare function sortJson(key: string | number, value: unknown): unknown;
export declare function sortObjectKeys<T extends Record<string, unknown>>(object: T, keyOrder: Readonly<string[]>): T;
