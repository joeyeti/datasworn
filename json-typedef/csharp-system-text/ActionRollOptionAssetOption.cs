// Code generated by jtd-codegen for C# + System.Text.Json v0.2.1

using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Datasworn
{
    public class ActionRollOptionAssetOption : ActionRollOption
    {
        [JsonPropertyName("using")]
        public string Using { get => "asset_option"; }

        /// <summary>
        /// Asset IDs (which may be wildcarded) that provide the option field.
        /// For asset ability enhancements, `null` is used to represent the
        /// asset's own option fields.
        /// </summary>
        [JsonPropertyName("assets")]
        public IList<AssetIdWildcard> Assets { get; set; }

        /// <summary>
        /// The key of the asset option field.
        /// </summary>
        [JsonPropertyName("option")]
        public DictKey Option { get; set; }
    }
}
