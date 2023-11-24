// Code generated by jtd-codegen for C# + System.Text.Json v0.2.1

using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Datasworn
{
    public class AssetOptionFieldSelectEnhancementChoiceOptionGroup : AssetOptionFieldSelectEnhancementChoice
    {
        [JsonPropertyName("option_type")]
        public string OptionType { get => "option_group"; }

        [JsonPropertyName("choices")]
        public IDictionary<string, AssetOptionFieldSelectEnhancementChoiceOptionGroupChoice> Choices { get; set; }

        /// <summary>
        /// A label for this option group.
        /// </summary>
        [JsonPropertyName("name")]
        public Label Name { get; set; }
    }
}
