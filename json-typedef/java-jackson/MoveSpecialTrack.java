// Code generated by jtd-codegen for Java + Jackson v0.2.1

package Datasworn;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.util.List;
import java.util.Map;

/**
 * A progress move that rolls on a special track, such as Legacies (Starforged)
 * or Bonds (classic Ironsworn). For progress moves that use standard progress
 * tracks, see MoveProgressRoll instead.
 */
@JsonSerialize
public class MoveSpecialTrack {
    @JsonProperty("_id")
    private MoveId id;

    @JsonProperty("_source")
    private SourceInfo source;

    @JsonProperty("allow_momentum_burn")
    private Boolean allowMomentumBurn;

    @JsonProperty("name")
    private Label name;

    @JsonProperty("outcomes")
    private MoveOutcomes outcomes;

    @JsonProperty("roll_type")
    private MoveSpecialTrackRollType rollType;

    @JsonProperty("text")
    private MarkdownString text;

    @JsonProperty("trigger")
    private TriggerSpecialTrack trigger;

    @JsonProperty("type")
    private MoveSpecialTrackType0 type;

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
    @JsonProperty("oracles")
    private Map<String, EmbeddedOracleRollable> oracles;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("replaces")
    private List<MoveIdWildcard> replaces;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("suggestions")
    private Suggestions suggestions;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("tags")
    private Tags tags;

    public MoveSpecialTrack() {
    }

    /**
     * Getter for id.<p>
     * The unique Datasworn ID for this node.
     */
    public MoveId getId() {
        return id;
    }

    /**
     * Setter for id.<p>
     * The unique Datasworn ID for this node.
     */
    public void setId(MoveId id) {
        this.id = id;
    }

    /**
     * Getter for source.<p>
     * Attribution for the original source (such as a book or website) of this
     * node, including the author and licensing information.
     */
    public SourceInfo getSource() {
        return source;
    }

    /**
     * Setter for source.<p>
     * Attribution for the original source (such as a book or website) of this
     * node, including the author and licensing information.
     */
    public void setSource(SourceInfo source) {
        this.source = source;
    }

    /**
     * Getter for allowMomentumBurn.<p>
     * Is burning momentum allowed for this move?
     */
    public Boolean getAllowMomentumBurn() {
        return allowMomentumBurn;
    }

    /**
     * Setter for allowMomentumBurn.<p>
     * Is burning momentum allowed for this move?
     */
    public void setAllowMomentumBurn(Boolean allowMomentumBurn) {
        this.allowMomentumBurn = allowMomentumBurn;
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
     * Getter for outcomes.<p>
     */
    public MoveOutcomes getOutcomes() {
        return outcomes;
    }

    /**
     * Setter for outcomes.<p>
     */
    public void setOutcomes(MoveOutcomes outcomes) {
        this.outcomes = outcomes;
    }

    /**
     * Getter for rollType.<p>
     */
    public MoveSpecialTrackRollType getRollType() {
        return rollType;
    }

    /**
     * Setter for rollType.<p>
     */
    public void setRollType(MoveSpecialTrackRollType rollType) {
        this.rollType = rollType;
    }

    /**
     * Getter for text.<p>
     * The complete rules text of the move.
     */
    public MarkdownString getText() {
        return text;
    }

    /**
     * Setter for text.<p>
     * The complete rules text of the move.
     */
    public void setText(MarkdownString text) {
        this.text = text;
    }

    /**
     * Getter for trigger.<p>
     * Trigger conditions for this move.
     */
    public TriggerSpecialTrack getTrigger() {
        return trigger;
    }

    /**
     * Setter for trigger.<p>
     * Trigger conditions for this move.
     */
    public void setTrigger(TriggerSpecialTrack trigger) {
        this.trigger = trigger;
    }

    /**
     * Getter for type.<p>
     */
    public MoveSpecialTrackType0 getType() {
        return type;
    }

    /**
     * Setter for type.<p>
     */
    public void setType(MoveSpecialTrackType0 type) {
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
     * Getter for replaces.<p>
     * Indicates that this move replaces the identified moves. References to the
     * replaced moves can be considered equivalent to this move.
     */
    public List<MoveIdWildcard> getReplaces() {
        return replaces;
    }

    /**
     * Setter for replaces.<p>
     * Indicates that this move replaces the identified moves. References to the
     * replaced moves can be considered equivalent to this move.
     */
    public void setReplaces(List<MoveIdWildcard> replaces) {
        this.replaces = replaces;
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
