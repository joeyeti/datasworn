// Code generated by jtd-codegen for C# + System.Text.Json v0.2.1

using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Datasworn
{
    [JsonConverter(typeof(OracleColumnText2TypeJsonConverter))]
    public enum OracleColumnText2Type
    {
        OracleRollable,
    }
    public class OracleColumnText2TypeJsonConverter : JsonConverter<OracleColumnText2Type>
    {
        public override OracleColumnText2Type Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            string value = JsonSerializer.Deserialize<string>(ref reader, options);
            switch (value)
            {
                case "oracle_rollable":
                    return OracleColumnText2Type.OracleRollable;
                default:
                    throw new ArgumentException(String.Format("Bad OracleColumnText2Type value: {0}", value));
            }
        }

        public override void Write(Utf8JsonWriter writer, OracleColumnText2Type value, JsonSerializerOptions options)
        {
            switch (value)
            {
                case OracleColumnText2Type.OracleRollable:
                    JsonSerializer.Serialize<string>(writer, "oracle_rollable", options);
                    return;
            }
        }
    }
}
