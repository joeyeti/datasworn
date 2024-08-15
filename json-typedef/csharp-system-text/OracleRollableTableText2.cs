// Code generated by jtd-codegen for C# + System.Text.Json v0.2.1

using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Datasworn
{
    /// <summary>
    /// A rollable oracle table with one roll column and two text columns.
    /// </summary>
    public class OracleRollableTableText2 : OracleRollable
    {
        [JsonPropertyName("oracle_type")]
        public string OracleType { get => "table_text2"; }

        /// <summary>
        /// The unique Datasworn ID for this node.
        /// </summary>
        [JsonPropertyName("_id")]
        public OracleRollableId Id { get; set; }

        /// <summary>
        /// Attribution for the original source (such as a book or website) of
        /// this node, including the author and licensing information.
        /// </summary>
        [JsonPropertyName("_source")]
        public SourceInfo Source { get; set; }

        [JsonPropertyName("column_labels")]
        public OracleRollableTableText2ColumnLabels ColumnLabels { get; set; }

        /// <summary>
        /// The roll used to select a result on this oracle.
        /// </summary>
        [JsonPropertyName("dice")]
        public DiceExpression Dice { get; set; }

        /// <summary>
        /// The primary name/label for this node.
        /// </summary>
        [JsonPropertyName("name")]
        public Label Name { get; set; }

        /// <summary>
        /// An array of objects, each representing a single row of the table.
        /// </summary>
        [JsonPropertyName("rows")]
        public IList<OracleRollableRowText2> Rows { get; set; }

        [JsonPropertyName("type")]
        public OracleRollableTableText2Type Type_ { get; set; }

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

        /// <summary>
        /// Most oracle tables are insensitive to matches, but a few define
        /// special match behavior.
        /// </summary>
        [JsonPropertyName("match")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public OracleMatchBehavior? Match { get; set; }

        [JsonPropertyName("recommended_rolls")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public OracleRollableTableText2RecommendedRolls RecommendedRolls { get; set; }

        /// <summary>
        /// This node replaces all nodes that match these wildcards. References
        /// to the replaced nodes can be considered equivalent to this node.
        /// </summary>
        [JsonPropertyName("replaces")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public IList<OracleRollableIdWildcard> Replaces { get; set; }

        [JsonPropertyName("suggestions")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public Suggestions? Suggestions { get; set; }

        [JsonPropertyName("tags")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public Tags? Tags { get; set; }
    }
}
