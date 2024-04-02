// Code generated by jtd-codegen for C# + System.Text.Json v0.2.1

using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Datasworn
{
    [JsonConverter(typeof(OracleColumnTextTypeJsonConverter))]
    public enum OracleColumnTextType
    {
        OracleRollable,
    }
    public class OracleColumnTextTypeJsonConverter : JsonConverter<OracleColumnTextType>
    {
        public override OracleColumnTextType Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            string value = JsonSerializer.Deserialize<string>(ref reader, options);
            switch (value)
            {
                case "oracle_rollable":
                    return OracleColumnTextType.OracleRollable;
                default:
                    throw new ArgumentException(String.Format("Bad OracleColumnTextType value: {0}", value));
            }
        }

        public override void Write(Utf8JsonWriter writer, OracleColumnTextType value, JsonSerializerOptions options)
        {
            switch (value)
            {
                case OracleColumnTextType.OracleRollable:
                    JsonSerializer.Serialize<string>(writer, "oracle_rollable", options);
                    return;
            }
        }
    }
}
