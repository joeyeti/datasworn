// Code generated by jtd-codegen for C# + System.Text.Json v0.2.1

using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Datasworn
{
    /// <summary>
    /// Localized, player-facing text, formatted in Markdown. It is *not*
    /// formatted for use "out of the box"; it uses some custom syntax,
    /// intended to be replaced in whatever way is most appropriate for your
    /// implementation.
    /// 
    /// * `[Link text](move:starforged/suffer/pay_the_price)`: A link to the
    /// identified object. The ID must conform to the `AnyId` type; no wildcards
    /// allowed.
    /// * `{{table>oracle_rollable:starforged/core/action}}`: the referenced
    /// oracle is rendered here in the source material. The ID must conform to
    /// the `AnyOracleRollableId` type; no wildcards allowed.
    /// * `{{table_columns>move:delve/delve/delve_the_depths}}`: Render
    /// *all* direct OracleRollable children of the identified node. This
    /// can be an OracleCollectionId, or the ID of anything that can have
    /// EmbeddedOracleRollables (such as a Move or TruthOption).
    /// </summary>
    [JsonConverter(typeof(MarkdownStringJsonConverter))]
    public class MarkdownString
    {
        /// <summary>
        /// The underlying data being wrapped.
        /// </summary>
        public string Value { get; set; }
    }

    public class MarkdownStringJsonConverter : JsonConverter<MarkdownString>
    {
        public override MarkdownString Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            return new MarkdownString { Value = JsonSerializer.Deserialize<string>(ref reader, options) };
        }

        public override void Write(Utf8JsonWriter writer, MarkdownString value, JsonSerializerOptions options)
        {
            JsonSerializer.Serialize<string>(writer, value.Value, options);
        }
    }
}
