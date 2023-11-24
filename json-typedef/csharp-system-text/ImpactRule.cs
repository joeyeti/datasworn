// Code generated by jtd-codegen for C# + System.Text.Json v0.2.1

using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Datasworn
{
    /// <summary>
    /// Describes a standard impact/debility.
    /// </summary>
    public class ImpactRule
    {
        /// <summary>
        /// A description of this impact.
        /// </summary>
        [JsonPropertyName("description")]
        public MarkdownString Description { get; set; }

        /// <summary>
        /// The label for this impact.
        /// </summary>
        [JsonPropertyName("label")]
        public Label Label { get; set; }

        /// <summary>
        /// Is this impact permanent?
        /// </summary>
        [JsonPropertyName("permanent")]
        public bool Permanent { get; set; }

        /// <summary>
        /// Keys of ruleset condition meters, to which this impact prevents
        /// recovery.
        /// </summary>
        [JsonPropertyName("prevents_recovery")]
        public IList<DictKey> PreventsRecovery { get; set; }

        /// <summary>
        /// Is this impact applied to all players at once?
        /// </summary>
        [JsonPropertyName("shared")]
        public bool Shared { get; set; }
    }
}
