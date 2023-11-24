// Code generated by jtd-codegen for C# + System.Text.Json v0.2.1

using System.Text.Json.Serialization;

namespace Datasworn
{
    public class AssetControlFieldEnhancementConditionMeter : AssetControlFieldEnhancement
    {
        [JsonPropertyName("field_type")]
        public string FieldType { get => "condition_meter"; }

        /// <summary>
        /// The maximum value of this meter.
        /// </summary>
        [JsonPropertyName("max")]
        public sbyte Max { get; set; }
    }
}
