/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type PageNumber = number;
/**
 * A localized plain text name or label.
 */
export type Label = string;
export type OracleTableID = string;
export type AssetID = string;
/**
 * A move ID, for a standard move or a unique asset move
 */
export type MoveID = string;
export type EncounterStarforgedID = string;
export type OracleCollectionID = string;
/**
 * A CSS color value. See: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
 */
export type CSSColor = string;
/**
 * Localized text, formatted in Markdown.
 */
export type MarkdownString = string;
export type OracleTableRowID = string;
/**
 * A relative URL pointing to a vector image in the SVG format.
 */
export type SVGImageURL = string;
/**
 * The ID of the oracle table to be rolled. If omitted, it defaults to the ID of this oracle table.
 */
export type OracleTableID1 = string;
export type OracleTableRollMethod = "no_duplicates" | "keep_duplicates" | "make_it_worse";
/**
 * A string template that may be used in place of OracleTableRow#result.
 */
export type TemplateString = string;
/**
 * A string template that may be used in place of OracleTableRow#summary.
 */
export type TemplateString1 = string;
/**
 * A string template that may be used in place of OracleTableRow#description.
 */
export type TemplateString2 = string;
export type OracleTableStyle = "table" | "embed_in_row" | "embed_as_column";
export type OracleColumnContentType = "range" | "result" | "summary" | "description";
export type OracleCollectionStyle = "multi_table";
/**
 * A relative URL pointing to a raster image in the WEBP format.
 */
export type WEBPImageURL = string;
export type MoveCategoryID = string;
export type Trigger = TriggerActionRoll | TriggerProgressRoll | TriggerNoRoll;
/**
 * Localized text, formatted in Markdown.
 */
export type MarkdownString1 = string;
/**
 * `any`: When rolling with this move trigger option, the player picks which stat to use.
 *
 * `all`: When rolling with this move trigger option, *every* stat or progress track of the `using` key is rolled.
 *
 * `highest`: When rolling with this move trigger option, use the highest/best option from the `using` key.
 *
 * `lowest`: When rolling with this move trigger option, use the lowest/worst option from the `using` key.
 */
export type MoveRollMethod = "any" | "all" | "highest" | "lowest";
export type MoveOutcomeType = "miss" | "weak_hit" | "strong_hit";
export type TriggerActionRollOptionChoice =
  | TriggerActionRollOptionChoiceStat
  | TriggerActionRollOptionChoiceRef
  | TriggerActionRollOptionChoiceAttachedAssetRef
  | TriggerActionRollOptionChoiceCustomValue;
export type PlayerStat = "edge" | "heart" | "iron" | "shadow" | "wits";
export type PlayerConditionMeter = "health" | "spirit" | "supply";
export type AssetConditionMeterIDWildcard = string;
export type AssetOptionFieldIDWildcard = string;
/**
 * Localized text, formatted in Markdown.
 */
export type MarkdownString2 = string;
export type ProgressType =
  | "quests_legacy"
  | "bonds_legacy"
  | "discoveries_legacy"
  | "combat_progress"
  | "vow_progress"
  | "scene_challenge_progress"
  | "expedition_progress"
  | "connection_progress";
/**
 * Localized text, formatted in Markdown.
 */
export type MarkdownString3 = string;
export type MoveRerollMethod = "any" | "all" | "challenge_die" | "challenge_dice" | "action_die";
export type AssetTypeID = string;
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z_]+$".
 */
export type AssetOptionField = SelectFieldPlayerStat | TextField;
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z_]+$".
 */
export type AssetControlField = CheckboxField;
export type AssetAbilityID = string;
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z_]+$".
 */
export type AssetAbilityOptionField = TextField;
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z_]+$".
 */
export type AssetAbilityControlField = ClockField | CounterField | CheckboxField;
export type AssetIDWildcard = string;
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z_]+$".
 *
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z_]+$".
 */
export type AssetConditionMeterControlField = CheckboxField;
export type TriggerExtension = TriggerActionRollExtension | TriggerProgressRollExtension;
/**
 * A move ID with wildcards
 */
export type MoveIDWithWildcard = string;
export type AssetConditionMeterID = string;
/**
 * Challenge rank, represented as a number: 1 = Troublesome, 2 = Dangerous, 3 = Formidable, 4 = Extreme, 5 = Epic
 */
export type ChallengeRank = 1 | 2 | 3 | 4 | 5;
export type EncounterNatureStarforged = string;
export type SettingTruthOptionID = string;
export type SettingTruthID = string;

/**
 * Describes game rules elements compatible with the Ironsworn: Starforged tabletop role-playing game by Shawn Tomkin.
 */
export interface DataforgedV200Dev {
  [k: string]: SourcebookStarforged;
}
/**
 * This interface was referenced by `DataforgedV200Dev`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z0-9_]{3,}$".
 */
export interface SourcebookStarforged {
  ruleset: "starforged";
  source: Source;
  oracles?: {
    [k: string]: OracleCollection;
  };
  moves?: {
    [k: string]: MoveCategory;
  };
  assets?: {
    [k: string]: AssetType;
  };
  encounters?: {
    [k: string]: EncounterStarforged;
  };
  setting_truths?: {
    [k: string]: SettingTruth;
  };
}
/**
 * Metadata describing the original source of this item
 */
export interface Source {
  /**
   * The title of the source document.
   */
  title: string;
  page?: PageNumber;
  /**
   * @minItems 1
   */
  authors: [
    {
      name: string;
      /**
       * An optional email contact for the author
       */
      email?: string;
    },
    ...{
      name: string;
      /**
       * An optional email contact for the author
       */
      email?: string;
    }[]
  ];
  /**
   * The date of the source documents's last update, formatted YYYY-MM-DD. Required because it's used to determine whether the data needs updating.
   */
  date: string;
  /**
   * An absolute URL where the source document is available.
   */
  url: string;
  /**
   * An absolute URL pointing to the location where this element's license can be found.
   */
  license: string;
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z_]+$".
 */
export interface OracleCollection {
  name: Label;
  canonical_name?: Label;
  source: Source;
  suggestions?: Suggestions;
  id: OracleCollectionID;
  extends?: OracleCollectionID;
  color?: CSSColor;
  summary?: MarkdownString;
  description?: MarkdownString;
  contents?: {
    [k: string]: OracleTable;
  };
  collections?: {
    [k: string]: OracleCollection;
  };
  rendering?: OracleCollectionRendering;
  images?: WEBPImageURL[];
  sample_names?: Label[];
}
export interface Suggestions {
  oracles?: OracleTableID[];
  assets?: AssetID[];
  moves?: MoveID[];
  encounters?: EncounterStarforgedID[];
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z_]+$".
 */
export interface OracleTable {
  name: Label;
  canonical_name?: Label;
  source: Source;
  suggestions?: Suggestions;
  id: OracleTableID;
  summary?: MarkdownString;
  description?: MarkdownString;
  match?: MatchBehavior;
  table: Row[];
  rendering?: OracleTableRendering;
}
export interface MatchBehavior {
  text: MarkdownString;
}
export interface Row {
  low: number | null;
  high: number | null;
  id: OracleTableRowID;
  result: MarkdownString;
  icon?: SVGImageURL;
  summary?: MarkdownString;
  description?: MarkdownString;
  rolls?: OracleTableRoll[];
  suggestions?: Suggestions;
  embed_table?: OracleTableID;
  template?: OracleRollTemplate;
}
export interface OracleTableRoll {
  oracle?: OracleTableID1;
  times?: number;
  method?: OracleTableRollMethod;
}
/**
 * Provides string templates that may be used in place of the static row text from `OracleTableRow#result`, `OracleTableRow#summary`, and `OracleTableRow#description`.
 *
 *   These strings are formatted in Markdown, but use a special syntax for their placeholders: `{{result:some_oracle_table_id}}`. The placeholder should be replaced with the value of a rolled (or selected) `OracleTableRow#result` from the target oracle table ID.
 */
export interface OracleRollTemplate {
  result?: TemplateString;
  summary?: TemplateString1;
  description?: TemplateString2;
}
export interface OracleTableRendering {
  icon?: SVGImageURL;
  style?: OracleTableStyle;
  color?: CSSColor;
}
export interface OracleCollectionRendering {
  columns: {
    [k: string]: OracleTableColumn;
  } & {
    [k: string]: OracleCollectionColumn;
  };
  color?: CSSColor;
  style?: OracleCollectionStyle;
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z_]+$".
 */
export interface OracleTableColumn {
  label?: Label;
  content_type: OracleColumnContentType;
}
/**
 * A column's default label is the title of the source table.
 *
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z_]+$".
 */
export interface OracleCollectionColumn {
  label?: Label;
  content_type: OracleColumnContentType;
  table_key: string;
  color?: CSSColor;
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z_]+$".
 */
export interface MoveCategory {
  name: Label;
  canonical_name?: Label;
  source: Source;
  suggestions?: Suggestions;
  id: MoveCategoryID;
  extends?: MoveCategoryID;
  color?: CSSColor;
  summary?: MarkdownString;
  description?: MarkdownString;
  contents?: {
    [k: string]: Move;
  };
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z_]+$".
 *
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z_]+$".
 */
export interface Move {
  id: MoveID;
  name: Label;
  source: Source;
  trigger: Trigger;
  text: MarkdownString;
  outcomes?: MoveOutcomes;
  oracles?: OracleTableID[];
  suggestions?: Suggestions;
}
export interface TriggerActionRoll {
  text: MarkdownString1;
  roll_type: "action_roll";
  roll_options: TriggerActionRollOption[];
}
export interface TriggerActionRollOption {
  text?: MarkdownString;
  method: MoveRollMethod | MoveOutcomeType;
  by?: TriggerBy;
  choices: TriggerActionRollOptionChoice[];
}
/**
 * Information on who can trigger this trigger option. Usually this is just the player, but some asset abilities can trigger from an ally's move.
 */
export interface TriggerBy {
  player: boolean;
  ally: boolean;
}
export interface TriggerActionRollOptionChoiceStat {
  using: PlayerStat | PlayerConditionMeter;
}
export interface TriggerActionRollOptionChoiceRef {
  using: "ref";
  ref: AssetConditionMeterIDWildcard | AssetOptionFieldIDWildcard;
}
export interface TriggerActionRollOptionChoiceAttachedAssetRef {
  using: "attached_asset_meter";
}
export interface TriggerActionRollOptionChoiceCustomValue {
  using: "custom_value";
  label: Label;
  value: number;
}
export interface TriggerProgressRoll {
  text: MarkdownString2;
  roll_type: "progress_roll";
  roll_options: TriggerProgressRollOption[];
}
export interface TriggerProgressRollOption {
  text?: MarkdownString;
  method: MoveRollMethod | MoveOutcomeType;
  by?: TriggerBy;
  choices: TriggerProgressRollOptionChoice[];
}
export interface TriggerProgressRollOptionChoice {
  using: ProgressType;
}
export interface TriggerNoRoll {
  text: MarkdownString3;
  roll_type: "no_roll";
  roll_options?: TriggerNoRollOption[];
}
export interface TriggerNoRollOption {
  text?: MarkdownString;
  method: MoveRollMethod | MoveOutcomeType;
  by?: TriggerBy;
}
export interface MoveOutcomes {
  miss: MoveOutcomeMatchable;
  weak_hit: MoveOutcome;
  strong_hit: MoveOutcomeMatchable;
}
export interface MoveOutcomeMatchable {
  text: MarkdownString;
  count_as?: MoveOutcomeType;
  reroll?: MoveReroll;
  match?: MoveOutcome;
}
export interface MoveReroll {
  text?: MarkdownString;
  method: MoveRerollMethod;
}
export interface MoveOutcome {
  text: MarkdownString;
  count_as?: MoveOutcomeType;
  reroll?: MoveReroll;
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z_]+$".
 */
export interface AssetType {
  name: Label;
  canonical_name?: Label;
  source: Source;
  suggestions?: Suggestions;
  id: AssetTypeID;
  extends?: AssetTypeID;
  color?: CSSColor;
  summary?: MarkdownString;
  description?: MarkdownString;
  contents?: {
    [k: string]: Asset;
  };
  member_label?: Label;
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z_]+$".
 */
export interface Asset {
  id: AssetID;
  name: Label;
  source: Source;
  options?: {
    [k: string]: AssetOptionField;
  };
  controls?: {
    [k: string]: AssetControlField;
  };
  suggestions?: Suggestions;
  requirement?: MarkdownString;
  /**
   * @minItems 3
   * @maxItems 3
   */
  abilities: [AssetAbility, AssetAbility, AssetAbility];
  condition_meter?: AssetConditionMeter1;
  /**
   * If `true`, this asset counts as an impact (Starforged) or a debility (classic Ironsworn).
   */
  count_as_impact?: boolean;
  attachments?: AssetAttachment;
  /**
   * Most assets only benefit to their owner, but certain assets (like Starforged's module and command vehicle assets) are shared amongst the player's allies, too.
   */
  shared?: boolean;
}
/**
 * Select a standard player stat or condition meter.
 */
export interface SelectFieldPlayerStat {
  id: string;
  label: Label;
  field_type: "select_stat";
  value?: PlayerStat | PlayerConditionMeter;
  choices: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[a-z_]+$".
     */
    [k: string]: {
      label: Label;
      value: PlayerStat | PlayerConditionMeter;
      selected?: boolean;
    };
  };
}
export interface TextField {
  id: string;
  label: Label;
  field_type: "text";
  value?: string;
}
export interface CheckboxField {
  id: string;
  label: Label;
  field_type: "checkbox";
  value?: boolean;
}
export interface AssetAbility {
  id: AssetAbilityID;
  name?: Label;
  text: MarkdownString;
  enabled: boolean;
  /**
   * Unique moves added by this asset ability.
   */
  moves?: {
    [k: string]: Move;
  };
  options?: {
    [k: string]: AssetAbilityOptionField;
  };
  controls?: {
    [k: string]: AssetAbilityControlField;
  };
  extend_asset?: {
    suggestions?: Suggestions;
    /**
     * If `true`, this asset counts as an impact (Starforged) or a debility (classic Ironsworn).
     */
    count_as_impact?: boolean;
    attachments?: AssetAttachment;
    /**
     * Most assets only benefit to their owner, but certain assets (like Starforged's module and command vehicle assets) are shared amongst the player's allies, too.
     */
    shared?: boolean;
  } & {
    condition_meter?: AssetConditionMeter;
  };
  extend_moves?: MoveExtension[];
}
export interface ClockField {
  id: string;
  label: Label;
  field_type: "clock";
  value?: number;
  min: 0;
  max: 4 | 6 | 8 | 10;
}
export interface CounterField {
  id: string;
  label: Label;
  field_type: "counter";
  value?: number;
  min: number;
  max?: number;
}
/**
 * Describes which assets can be attached to this asset. Example: Starforged's Module assets, which can be equipped by Command Vehicle assets. See p. 55 of Starforged for more info.
 */
export interface AssetAttachment {
  /**
   * Asset IDs (which may be wildcards) that may be attached to this asset
   */
  assets: AssetIDWildcard[];
  /**
   * Omit if there's no upper limit to the number of attached assets.
   */
  max?: number;
}
export interface AssetConditionMeter {
  min?: number;
  max?: number;
  controls?: {
    [k: string]: AssetConditionMeterControlField;
  };
}
export interface MoveExtension {
  text?: MarkdownString;
  oracles?: OracleTableID[];
  trigger?: TriggerExtension;
  outcomes?: MoveOutcomesExtension;
  extends?: MoveIDWithWildcard[];
}
export interface TriggerActionRollExtension {
  roll_type: "action_roll";
  roll_options: TriggerActionRollOptionExtension[];
}
export interface TriggerActionRollOptionExtension {
  text?: MarkdownString;
  method?: MoveRollMethod | MoveOutcomeType;
  by?: TriggerBy;
  choices?: TriggerActionRollOptionChoice[];
}
export interface TriggerProgressRollExtension {
  roll_type: "progress_roll";
  roll_options: TriggerProgressRollOptionExtension[];
}
export interface TriggerProgressRollOptionExtension {
  text?: MarkdownString;
  method?: MoveRollMethod | MoveOutcomeType;
  by?: TriggerBy;
  choices?: TriggerProgressRollOptionChoice[];
}
export interface MoveOutcomesExtension {
  miss?: MoveOutcomeMatchableExtension;
  weak_hit?: MoveOutcomeExtension;
  strong_hit?: MoveOutcomeMatchableExtension;
}
export interface MoveOutcomeMatchableExtension {
  text?: MarkdownString;
  count_as?: MoveOutcomeType;
  reroll?: MoveReroll;
  match?: MoveOutcome;
}
export interface MoveOutcomeExtension {
  text?: MarkdownString;
  count_as?: MoveOutcomeType;
  reroll?: MoveReroll;
}
export interface AssetConditionMeter1 {
  min: number;
  max: number;
  id: AssetConditionMeterID;
  controls?: {
    [k: string]: AssetConditionMeterControlField;
  };
}
/**
 * An encounter entry similar to those in Chapter 4 of Ironsworn: Starforged.
 *
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z_]+$".
 */
export interface EncounterStarforged {
  name: Label;
  canonical_name?: Label;
  source: Source;
  suggestions?: Suggestions;
  features: MarkdownString[];
  summary: MarkdownString;
  description: MarkdownString;
  quest_starter: MarkdownString;
  rank: ChallengeRank;
  drives: MarkdownString[];
  tactics: MarkdownString[];
  id: EncounterStarforgedID;
  nature: EncounterNatureStarforged;
  variants?: {
    [k: string]: EncounterVariantStarforged;
  };
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z_]+$".
 */
export interface EncounterVariantStarforged {
  name: Label;
  rank: ChallengeRank;
  description: MarkdownString;
  id: EncounterStarforgedID;
  nature: EncounterNatureStarforged;
}
/**
 * A setting truth category in the format used by Starforged.
 *
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z_]+$".
 */
export interface SettingTruth {
  name: Label;
  canonical_name?: Label;
  source: Source;
  suggestions?: Suggestions;
  options: SettingTruthOption[];
  icon?: SVGImageURL;
  id: SettingTruthID;
}
export interface SettingTruthOption {
  description: MarkdownString;
  quest_starter: MarkdownString;
  id: SettingTruthOptionID;
  summary: MarkdownString;
}
