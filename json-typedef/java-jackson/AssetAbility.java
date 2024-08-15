// Code generated by jtd-codegen for Java + Jackson v0.2.1

package Datasworn;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.util.List;
import java.util.Map;

/**
 * An asset ability: one of the purchasable features of an asset. Most assets
 * have three.
 */
@JsonSerialize
public class AssetAbility {
    @JsonProperty("_id")
    private AssetAbilityId id;

    @JsonProperty("enabled")
    private Boolean enabled;

    @JsonProperty("text")
    private MarkdownString text;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("_comment")
    private Documentation comment;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("controls")
    private Map<String, AssetAbilityControlField> controls;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("enhance_asset")
    private AssetEnhancement enhanceAsset;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("enhance_moves")
    private List<MoveEnhancement> enhanceMoves;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("moves")
    private Map<String, EmbeddedMove> moves;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("name")
    private Label name;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("options")
    private Map<String, AssetAbilityOptionField> options;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("oracles")
    private Map<String, EmbeddedOracleRollable> oracles;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("tags")
    private Tags tags;

    public AssetAbility() {
    }

    /**
     * Getter for id.<p>
     * The unique Datasworn ID for this node.
     */
    public AssetAbilityId getId() {
        return id;
    }

    /**
     * Setter for id.<p>
     * The unique Datasworn ID for this node.
     */
    public void setId(AssetAbilityId id) {
        this.id = id;
    }

    /**
     * Getter for enabled.<p>
     * Is this asset ability enabled?
     */
    public Boolean getEnabled() {
        return enabled;
    }

    /**
     * Setter for enabled.<p>
     * Is this asset ability enabled?
     */
    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    /**
     * Getter for text.<p>
     * The complete rules text of this asset ability.
     */
    public MarkdownString getText() {
        return text;
    }

    /**
     * Setter for text.<p>
     * The complete rules text of this asset ability.
     */
    public void setText(MarkdownString text) {
        this.text = text;
    }

    /**
     * Getter for comment.<p>
     */
    public Documentation getComment() {
        return comment;
    }

    /**
     * Setter for comment.<p>
     */
    public void setComment(Documentation comment) {
        this.comment = comment;
    }

    /**
     * Getter for controls.<p>
     * Fields whose values are expected to change over the life of the asset.
     */
    public Map<String, AssetAbilityControlField> getControls() {
        return controls;
    }

    /**
     * Setter for controls.<p>
     * Fields whose values are expected to change over the life of the asset.
     */
    public void setControls(Map<String, AssetAbilityControlField> controls) {
        this.controls = controls;
    }

    /**
     * Getter for enhanceAsset.<p>
     * Changes made to the asset, when this ability is enabled.
     */
    public AssetEnhancement getEnhanceAsset() {
        return enhanceAsset;
    }

    /**
     * Setter for enhanceAsset.<p>
     * Changes made to the asset, when this ability is enabled.
     */
    public void setEnhanceAsset(AssetEnhancement enhanceAsset) {
        this.enhanceAsset = enhanceAsset;
    }

    /**
     * Getter for enhanceMoves.<p>
     * Describes changes made to various moves by this asset ability. Usually
     * these require specific trigger conditions.
     */
    public List<MoveEnhancement> getEnhanceMoves() {
        return enhanceMoves;
    }

    /**
     * Setter for enhanceMoves.<p>
     * Describes changes made to various moves by this asset ability. Usually
     * these require specific trigger conditions.
     */
    public void setEnhanceMoves(List<MoveEnhancement> enhanceMoves) {
        this.enhanceMoves = enhanceMoves;
    }

    /**
     * Getter for moves.<p>
     * Unique moves added by this asset ability.
     */
    public Map<String, EmbeddedMove> getMoves() {
        return moves;
    }

    /**
     * Setter for moves.<p>
     * Unique moves added by this asset ability.
     */
    public void setMoves(Map<String, EmbeddedMove> moves) {
        this.moves = moves;
    }

    /**
     * Getter for name.<p>
     * A handful of asset abilities have a label/name, for instance classic
     * Ironsworn companion assets. Most canonical assets omit this property.
     */
    public Label getName() {
        return name;
    }

    /**
     * Setter for name.<p>
     * A handful of asset abilities have a label/name, for instance classic
     * Ironsworn companion assets. Most canonical assets omit this property.
     */
    public void setName(Label name) {
        this.name = name;
    }

    /**
     * Getter for options.<p>
     * Fields that are expected to be set once and remain the same through the
     * life of the asset.
     */
    public Map<String, AssetAbilityOptionField> getOptions() {
        return options;
    }

    /**
     * Setter for options.<p>
     * Fields that are expected to be set once and remain the same through the
     * life of the asset.
     */
    public void setOptions(Map<String, AssetAbilityOptionField> options) {
        this.options = options;
    }

    /**
     * Getter for oracles.<p>
     */
    public Map<String, EmbeddedOracleRollable> getOracles() {
        return oracles;
    }

    /**
     * Setter for oracles.<p>
     */
    public void setOracles(Map<String, EmbeddedOracleRollable> oracles) {
        this.oracles = oracles;
    }

    /**
     * Getter for tags.<p>
     */
    public Tags getTags() {
        return tags;
    }

    /**
     * Setter for tags.<p>
     */
    public void setTags(Tags tags) {
        this.tags = tags;
    }
}
