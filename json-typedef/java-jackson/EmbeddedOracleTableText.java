// Code generated by jtd-codegen for Java + Jackson v0.2.1

package Datasworn;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.util.List;

@JsonSerialize
public class EmbeddedOracleTableText {
    @JsonProperty("_id")
    private EmbeddedOracleRollableId id;

    @JsonProperty("column_labels")
    private EmbeddedOracleTableTextColumnLabels columnLabels;

    @JsonProperty("dice")
    private DiceExpression dice;

    @JsonProperty("name")
    private Label name;

    @JsonProperty("oracle_type")
    private EmbeddedOracleTableTextOracleType oracleType;

    @JsonProperty("rows")
    private List<OracleRollableRowText> rows;

    @JsonProperty("type")
    private EmbeddedOracleTableTextType type;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("_comment")
    private Documentation comment;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("canonical_name")
    private Label canonicalName;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("color")
    private CssColor color;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("icon")
    private SvgImageUrl icon;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("images")
    private List<WebpImageUrl> images;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("match")
    private OracleMatchBehavior match;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("recommended_rolls")
    private EmbeddedOracleTableTextRecommendedRolls recommendedRolls;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("suggestions")
    private Suggestions suggestions;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("tags")
    private Tags tags;

    public EmbeddedOracleTableText() {
    }

    /**
     * Getter for id.<p>
     */
    public EmbeddedOracleRollableId getId() {
        return id;
    }

    /**
     * Setter for id.<p>
     */
    public void setId(EmbeddedOracleRollableId id) {
        this.id = id;
    }

    /**
     * Getter for columnLabels.<p>
     */
    public EmbeddedOracleTableTextColumnLabels getColumnLabels() {
        return columnLabels;
    }

    /**
     * Setter for columnLabels.<p>
     */
    public void setColumnLabels(EmbeddedOracleTableTextColumnLabels columnLabels) {
        this.columnLabels = columnLabels;
    }

    /**
     * Getter for dice.<p>
     * The roll used to select a result on this oracle.
     */
    public DiceExpression getDice() {
        return dice;
    }

    /**
     * Setter for dice.<p>
     * The roll used to select a result on this oracle.
     */
    public void setDice(DiceExpression dice) {
        this.dice = dice;
    }

    /**
     * Getter for name.<p>
     * The primary name/label for this node.
     */
    public Label getName() {
        return name;
    }

    /**
     * Setter for name.<p>
     * The primary name/label for this node.
     */
    public void setName(Label name) {
        this.name = name;
    }

    /**
     * Getter for oracleType.<p>
     */
    public EmbeddedOracleTableTextOracleType getOracleType() {
        return oracleType;
    }

    /**
     * Setter for oracleType.<p>
     */
    public void setOracleType(EmbeddedOracleTableTextOracleType oracleType) {
        this.oracleType = oracleType;
    }

    /**
     * Getter for rows.<p>
     * An array of objects, each representing a single row of the table.
     */
    public List<OracleRollableRowText> getRows() {
        return rows;
    }

    /**
     * Setter for rows.<p>
     * An array of objects, each representing a single row of the table.
     */
    public void setRows(List<OracleRollableRowText> rows) {
        this.rows = rows;
    }

    /**
     * Getter for type.<p>
     */
    public EmbeddedOracleTableTextType getType() {
        return type;
    }

    /**
     * Setter for type.<p>
     */
    public void setType(EmbeddedOracleTableTextType type) {
        this.type = type;
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
     * Getter for canonicalName.<p>
     * The name of this node as it appears on the page in the book, if it's
     * different from `name`.
     */
    public Label getCanonicalName() {
        return canonicalName;
    }

    /**
     * Setter for canonicalName.<p>
     * The name of this node as it appears on the page in the book, if it's
     * different from `name`.
     */
    public void setCanonicalName(Label canonicalName) {
        this.canonicalName = canonicalName;
    }

    /**
     * Getter for color.<p>
     * A thematic color associated with this node.
     */
    public CssColor getColor() {
        return color;
    }

    /**
     * Setter for color.<p>
     * A thematic color associated with this node.
     */
    public void setColor(CssColor color) {
        this.color = color;
    }

    /**
     * Getter for icon.<p>
     * An SVG icon associated with this collection.
     */
    public SvgImageUrl getIcon() {
        return icon;
    }

    /**
     * Setter for icon.<p>
     * An SVG icon associated with this collection.
     */
    public void setIcon(SvgImageUrl icon) {
        this.icon = icon;
    }

    /**
     * Getter for images.<p>
     */
    public List<WebpImageUrl> getImages() {
        return images;
    }

    /**
     * Setter for images.<p>
     */
    public void setImages(List<WebpImageUrl> images) {
        this.images = images;
    }

    /**
     * Getter for match.<p>
     * Most oracle tables are insensitive to matches, but a few define special
     * match behavior.
     */
    public OracleMatchBehavior getMatch() {
        return match;
    }

    /**
     * Setter for match.<p>
     * Most oracle tables are insensitive to matches, but a few define special
     * match behavior.
     */
    public void setMatch(OracleMatchBehavior match) {
        this.match = match;
    }

    /**
     * Getter for recommendedRolls.<p>
     */
    public EmbeddedOracleTableTextRecommendedRolls getRecommendedRolls() {
        return recommendedRolls;
    }

    /**
     * Setter for recommendedRolls.<p>
     */
    public void setRecommendedRolls(EmbeddedOracleTableTextRecommendedRolls recommendedRolls) {
        this.recommendedRolls = recommendedRolls;
    }

    /**
     * Getter for suggestions.<p>
     */
    public Suggestions getSuggestions() {
        return suggestions;
    }

    /**
     * Setter for suggestions.<p>
     */
    public void setSuggestions(Suggestions suggestions) {
        this.suggestions = suggestions;
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
