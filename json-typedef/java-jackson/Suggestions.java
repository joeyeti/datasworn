// Code generated by jtd-codegen for Java + Jackson v0.2.1

package Datasworn;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.util.List;

@JsonSerialize
public class Suggestions {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("assets")
    private List<AssetId> assets;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("atlas")
    private List<AtlasEntryId> atlas;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("moves")
    private List<MoveId> moves;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("npcs")
    private List<NpcId> npcs;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("oracles")
    private List<OracleTableId> oracles;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("rarities")
    private List<RarityId> rarities;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("site_domains")
    private List<DelveSiteDomainId> siteDomains;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("site_themes")
    private List<DelveSiteThemeId> siteThemes;

    public Suggestions() {
    }

    /**
     * Getter for assets.<p>
     */
    public List<AssetId> getAssets() {
        return assets;
    }

    /**
     * Setter for assets.<p>
     */
    public void setAssets(List<AssetId> assets) {
        this.assets = assets;
    }

    /**
     * Getter for atlas.<p>
     */
    public List<AtlasEntryId> getAtlas() {
        return atlas;
    }

    /**
     * Setter for atlas.<p>
     */
    public void setAtlas(List<AtlasEntryId> atlas) {
        this.atlas = atlas;
    }

    /**
     * Getter for moves.<p>
     */
    public List<MoveId> getMoves() {
        return moves;
    }

    /**
     * Setter for moves.<p>
     */
    public void setMoves(List<MoveId> moves) {
        this.moves = moves;
    }

    /**
     * Getter for npcs.<p>
     */
    public List<NpcId> getNpcs() {
        return npcs;
    }

    /**
     * Setter for npcs.<p>
     */
    public void setNpcs(List<NpcId> npcs) {
        this.npcs = npcs;
    }

    /**
     * Getter for oracles.<p>
     */
    public List<OracleTableId> getOracles() {
        return oracles;
    }

    /**
     * Setter for oracles.<p>
     */
    public void setOracles(List<OracleTableId> oracles) {
        this.oracles = oracles;
    }

    /**
     * Getter for rarities.<p>
     */
    public List<RarityId> getRarities() {
        return rarities;
    }

    /**
     * Setter for rarities.<p>
     */
    public void setRarities(List<RarityId> rarities) {
        this.rarities = rarities;
    }

    /**
     * Getter for siteDomains.<p>
     */
    public List<DelveSiteDomainId> getSiteDomains() {
        return siteDomains;
    }

    /**
     * Setter for siteDomains.<p>
     */
    public void setSiteDomains(List<DelveSiteDomainId> siteDomains) {
        this.siteDomains = siteDomains;
    }

    /**
     * Getter for siteThemes.<p>
     */
    public List<DelveSiteThemeId> getSiteThemes() {
        return siteThemes;
    }

    /**
     * Setter for siteThemes.<p>
     */
    public void setSiteThemes(List<DelveSiteThemeId> siteThemes) {
        this.siteThemes = siteThemes;
    }
}
