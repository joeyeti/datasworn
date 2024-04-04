// Code generated by jtd-codegen for C# + System.Text.Json v0.2.1

using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Datasworn
{
    [JsonConverter(typeof(ObjectTypeJsonConverter))]
    public enum ObjectType
    {
        Asset,

        AssetCollection,

        AtlasCollection,

        AtlasEntry,

        DelveSite,

        DelveSiteDomain,

        DelveSiteTheme,

        Move,

        MoveCategory,

        Npc,

        NpcCollection,

        OracleCollection,

        OracleRollable,

        Rarity,

        Truth,
    }
    public class ObjectTypeJsonConverter : JsonConverter<ObjectType>
    {
        public override ObjectType Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            string value = JsonSerializer.Deserialize<string>(ref reader, options);
            switch (value)
            {
                case "asset":
                    return ObjectType.Asset;
                case "asset_collection":
                    return ObjectType.AssetCollection;
                case "atlas_collection":
                    return ObjectType.AtlasCollection;
                case "atlas_entry":
                    return ObjectType.AtlasEntry;
                case "delve_site":
                    return ObjectType.DelveSite;
                case "delve_site_domain":
                    return ObjectType.DelveSiteDomain;
                case "delve_site_theme":
                    return ObjectType.DelveSiteTheme;
                case "move":
                    return ObjectType.Move;
                case "move_category":
                    return ObjectType.MoveCategory;
                case "npc":
                    return ObjectType.Npc;
                case "npc_collection":
                    return ObjectType.NpcCollection;
                case "oracle_collection":
                    return ObjectType.OracleCollection;
                case "oracle_rollable":
                    return ObjectType.OracleRollable;
                case "rarity":
                    return ObjectType.Rarity;
                case "truth":
                    return ObjectType.Truth;
                default:
                    throw new ArgumentException(String.Format("Bad ObjectType value: {0}", value));
            }
        }

        public override void Write(Utf8JsonWriter writer, ObjectType value, JsonSerializerOptions options)
        {
            switch (value)
            {
                case ObjectType.Asset:
                    JsonSerializer.Serialize<string>(writer, "asset", options);
                    return;
                case ObjectType.AssetCollection:
                    JsonSerializer.Serialize<string>(writer, "asset_collection", options);
                    return;
                case ObjectType.AtlasCollection:
                    JsonSerializer.Serialize<string>(writer, "atlas_collection", options);
                    return;
                case ObjectType.AtlasEntry:
                    JsonSerializer.Serialize<string>(writer, "atlas_entry", options);
                    return;
                case ObjectType.DelveSite:
                    JsonSerializer.Serialize<string>(writer, "delve_site", options);
                    return;
                case ObjectType.DelveSiteDomain:
                    JsonSerializer.Serialize<string>(writer, "delve_site_domain", options);
                    return;
                case ObjectType.DelveSiteTheme:
                    JsonSerializer.Serialize<string>(writer, "delve_site_theme", options);
                    return;
                case ObjectType.Move:
                    JsonSerializer.Serialize<string>(writer, "move", options);
                    return;
                case ObjectType.MoveCategory:
                    JsonSerializer.Serialize<string>(writer, "move_category", options);
                    return;
                case ObjectType.Npc:
                    JsonSerializer.Serialize<string>(writer, "npc", options);
                    return;
                case ObjectType.NpcCollection:
                    JsonSerializer.Serialize<string>(writer, "npc_collection", options);
                    return;
                case ObjectType.OracleCollection:
                    JsonSerializer.Serialize<string>(writer, "oracle_collection", options);
                    return;
                case ObjectType.OracleRollable:
                    JsonSerializer.Serialize<string>(writer, "oracle_rollable", options);
                    return;
                case ObjectType.Rarity:
                    JsonSerializer.Serialize<string>(writer, "rarity", options);
                    return;
                case ObjectType.Truth:
                    JsonSerializer.Serialize<string>(writer, "truth", options);
                    return;
            }
        }
    }
}
