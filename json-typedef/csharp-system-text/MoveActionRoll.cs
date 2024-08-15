// Code generated by jtd-codegen for C# + System.Text.Json v0.2.1

using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Datasworn
{
    /// <summary>
    /// A move that makes an action roll.
    /// </summary>
    public class MoveActionRoll
    {
        /// <summary>
        /// The unique Datasworn ID for this node.
        /// </summary>
        [JsonPropertyName("_id")]
        public MoveId Id { get; set; }

        /// <summary>
        /// Attribution for the original source (such as a book or website) of
        /// this node, including the author and licensing information.
        /// </summary>
        [JsonPropertyName("_source")]
        public SourceInfo Source { get; set; }

        /// <summary>
        /// Is burning momentum allowed for this move?
        /// </summary>
        [JsonPropertyName("allow_momentum_burn")]
        public bool AllowMomentumBurn { get; set; }

        /// <summary>
        /// The primary name/label for this node.
        /// </summary>
        [JsonPropertyName("name")]
        public Label Name { get; set; }

        [JsonPropertyName("outcomes")]
        public MoveOutcomes Outcomes { get; set; }

        [JsonPropertyName("roll_type")]
        public MoveActionRollRollType RollType { get; set; }

        /// <summary>
        /// The complete rules text of the move.
        /// </summary>
        [JsonPropertyName("text")]
        public MarkdownString Text { get; set; }

        /// <summary>
        /// Trigger conditions for this move.
        /// </summary>
        [JsonPropertyName("trigger")]
        public TriggerActionRoll Trigger { get; set; }

        [JsonPropertyName("type")]
        public MoveActionRollType0 Type_ { get; set; }

        [JsonPropertyName("_comment")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public Documentation? Comment { get; set; }

        /// <summary>
        /// The name of this node as it appears on the page in the book, if it's
        /// different from `name`.
        /// </summary>
        [JsonPropertyName("canonical_name")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public Label? CanonicalName { get; set; }

        /// <summary>
        /// A thematic color associated with this node.
        /// </summary>
        [JsonPropertyName("color")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public CssColor? Color { get; set; }

        /// <summary>
        /// An SVG icon associated with this collection.
        /// </summary>
        [JsonPropertyName("icon")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public SvgImageUrl? Icon { get; set; }

        [JsonPropertyName("images")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public IList<WebpImageUrl> Images { get; set; }

        [JsonPropertyName("oracles")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public IDictionary<string, EmbeddedOracleRollable> Oracles { get; set; }

        /// <summary>
        /// Indicates that this move replaces the identified moves. References
        /// to the replaced moves can be considered equivalent to this move.
        /// </summary>
        [JsonPropertyName("replaces")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public IList<MoveIdWildcard> Replaces { get; set; }

        [JsonPropertyName("suggestions")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public Suggestions? Suggestions { get; set; }

        [JsonPropertyName("tags")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public Tags? Tags { get; set; }
    }
}
