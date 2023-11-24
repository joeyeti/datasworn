// Code generated by jtd-codegen for C# + System.Text.Json v0.2.1

using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Datasworn
{
    public class TriggerProgressRollConditionEnhancement
    {
        /// <summary>
        /// A `null` value means this condition provides no roll mechanic of its
        /// own; it must be used with another trigger condition that provides a
        /// non-null `method`.
        /// </summary>
        [JsonPropertyName("method")]
        public ProgressRollMethod? Method { get; set; }

        /// <summary>
        /// The options available when rolling with this trigger condition.
        /// </summary>
        [JsonPropertyName("roll_options")]
        public IList<ProgressRollOption> RollOptions { get; set; }

        [JsonPropertyName("by")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public TriggerBy? By { get; set; }

        /// <summary>
        /// A markdown string of any trigger text specific to this trigger
        /// condition.
        /// </summary>
        [JsonPropertyName("text")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public MarkdownString? Text { get; set; }
    }
}
