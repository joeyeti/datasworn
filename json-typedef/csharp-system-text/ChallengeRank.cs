// Code generated by jtd-codegen for C# + System.Text.Json v0.2.1

using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Datasworn
{
    /// <summary>
    /// Challenge rank, represented as an integer.
    /// </summary>
    [JsonConverter(typeof(ChallengeRankJsonConverter))]
    public class ChallengeRank
    {
        /// <summary>
        /// The underlying data being wrapped.
        /// </summary>
        public byte Value { get; set; }
    }

    public class ChallengeRankJsonConverter : JsonConverter<ChallengeRank>
    {
        public override ChallengeRank Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            return new ChallengeRank { Value = JsonSerializer.Deserialize<byte>(ref reader, options) };
        }

        public override void Write(Utf8JsonWriter writer, ChallengeRank value, JsonSerializerOptions options)
        {
            JsonSerializer.Serialize<byte>(writer, value.Value, options);
        }
    }
}
