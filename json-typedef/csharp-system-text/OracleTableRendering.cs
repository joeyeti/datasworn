// Code generated by jtd-codegen for C# + System.Text.Json v0.2.1

using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Datasworn
{
    /// <summary>
    /// Describes the presentation of this table.
    /// </summary>
    [JsonConverter(typeof(OracleTableRenderingJsonConverter))]
    public abstract class OracleTableRendering
    {
    }

    public class OracleTableRenderingJsonConverter : JsonConverter<OracleTableRendering>
    {
        public override OracleTableRendering Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var readerCopy = reader;
            var tagValue = JsonDocument.ParseValue(ref reader).RootElement.GetProperty("style").GetString();

            switch (tagValue)
            {
                case "column":
                    return JsonSerializer.Deserialize<OracleTableRenderingColumn>(ref readerCopy, options);
                case "embed_in_row":
                    return JsonSerializer.Deserialize<OracleTableRenderingEmbedInRow>(ref readerCopy, options);
                case "standalone":
                    return JsonSerializer.Deserialize<OracleTableRenderingStandalone>(ref readerCopy, options);
                default:
                    throw new ArgumentException(String.Format("Bad Style value: {0}", tagValue));
            }
        }

        public override void Write(Utf8JsonWriter writer, OracleTableRendering value, JsonSerializerOptions options)
        {
            JsonSerializer.Serialize(writer, value, value.GetType(), options);
        }
    }
}
