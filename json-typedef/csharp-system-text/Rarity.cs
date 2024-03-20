// Code generated by jtd-codegen for C# + System.Text.Json v0.2.1

using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Datasworn
{
    /// <summary>
    /// A rarity, as described in Ironsworn: Delve.
    /// </summary>
    public class Rarity
    {
        /// <summary>
        /// The unique Datasworn ID for this item.
        /// </summary>
        [JsonPropertyName("_id")]
        public RarityId Id { get; set; }

        /// <summary>
        /// Attribution for the original source (such as a book or website) of
        /// this item, including the author and licensing information.
        /// </summary>
        [JsonPropertyName("_source")]
        public SourceInfo Source { get; set; }

        /// <summary>
        /// The asset augmented by this rarity.
        /// </summary>
        [JsonPropertyName("asset")]
        public AssetId Asset { get; set; }

        [JsonPropertyName("description")]
        public MarkdownString Description { get; set; }

        /// <summary>
        /// The primary name/label for this item.
        /// </summary>
        [JsonPropertyName("name")]
        public Label Name { get; set; }

        /// <summary>
        /// From Ironsworn: Delve, p. 174:
        /// 
        ///       Some assets will bring a rarity into play more often than
        /// others, so the experience point cost for a rarity will vary by the
        /// linked asset. These costs are shown in the tables on page 175.
        /// 
        ///       If you are playing solo, and aren’t concerned with the
        /// relative balance of rarity abilities, you can ignore these variable
        /// costs. If so, spend 3 experience points to purchase a rarity.
        /// </summary>
        [JsonPropertyName("xp_cost")]
        public short XpCost { get; set; }

        /// <summary>
        /// The name of this item as it appears on the page in the book, if it's
        /// different from `name`.
        /// </summary>
        [JsonPropertyName("canonical_name")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public Label? CanonicalName { get; set; }

        [JsonPropertyName("icon")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public SvgImageUrl? Icon { get; set; }

        [JsonPropertyName("suggestions")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public Suggestions? Suggestions { get; set; }

        [JsonPropertyName("tags")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public IDictionary<string, IDictionary<string, Tag>> Tags { get; set; }
    }
}
