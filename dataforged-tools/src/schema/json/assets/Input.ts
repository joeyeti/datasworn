import type { ClockSegments, ClockType, HasId, HasLabel, InputType } from "@schema";

/**
 * A stub interface representing an input widget of any type.
 * @see {@link InputNumber}, {@link InputClock}, {@link InputText}, {@link InputSelect}
 * @public
 */
export interface Input extends HasId,  HasLabel {
  /**
   * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+/[a-z_-]+(/abilities/[1-3])?/inputs/[a-z_-]+$
   */
  $id: string;
  "Input type": InputType;
  /**
   * Whether the input's value is expected to change over the course of a campaign. For example, name fields are typically `false`, while something like a clock or tally would be `true`.
   *
   * It's a good idea to make everything editable regardless, but this property might inform whether your UI presents that functionality "front and center" or as a secondary interaction (via long press, right click, etc);
   */
  Adjustable: boolean;
  Label: string;
}


/**
 * An input where the user sets an integer.
 * Suggested rendering: a number input spinner, similar to `<input type='number'>` in HTML.
 * @see {@link InputType.Number}
 * @public
 */
export interface InputNumber extends Input {
  "Input type": InputType.Number;
  Min: number;
  /**
   * @nullable
   */
  Max: number | null;
  Step: 1;
  Value: number;
}

/**
 * An input representing an *Ironsworn: Starforged* clock.
 * @page 239
 * @see {@link InputType.Clock}
 * @public
 */
export interface InputClock extends Input {
  "Input type": InputType.Clock;
  /**
   * Whether the clock is a Tension Clock or a Campaign Clock. For assets this doesn't really matter since they have their own specific trigger conditions, and can probably be ignored.
   */
  "Clock type": ClockType;
  /**
   * An integer representing the total number of segments in this Clock. *Ironsworn: Starforged* uses clocks with 4, 6, 8, and 10 segments.
   *
   * `Filled` should not exceed this number.
   */
  Segments: ClockSegments
  /**
   * An integer representing how many filled segments this clock has. This is always 0 in Dataforged; it's included to make it easy to store clock states with the same interface.
   */
  Filled: number;
}
/**
 * A text input.
 * Suggested rendering: a single-line text input, similar to `<input type='text'>` in HTML.
 * @see {@link InputType.Text}
 * @public
 */
export interface InputText extends Input {
  "Input type": InputType.Text
 }


