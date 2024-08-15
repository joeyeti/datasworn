// Code generated by jtd-codegen for Java + Jackson v0.2.1

package Datasworn;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.util.List;

@JsonSerialize
public class EmbeddedProgressRollMove {
    @JsonProperty("_id")
    private EmbeddedMoveId id;

    @JsonProperty("allow_momentum_burn")
    private Boolean allowMomentumBurn;

    @JsonProperty("name")
    private Label name;

    @JsonProperty("outcomes")
    private MoveOutcomes outcomes;

    @JsonProperty("roll_type")
    private EmbeddedProgressRollMoveRollType rollType;

    @JsonProperty("text")
    private MarkdownString text;

    @JsonProperty("tracks")
    private ProgressTrackTypeInfo tracks;

    @JsonProperty("trigger")
    private TriggerProgressRoll trigger;

    @JsonProperty("type")
    private EmbeddedProgressRollMoveType type;

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
    @JsonProperty("suggestions")
    private Suggestions suggestions;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("tags")
    private Tags tags;

    public EmbeddedProgressRollMove() {
    }

    /**
     * Getter for id.<p>
     */
    public EmbeddedMoveId getId() {
        return id;
    }

    /**
     * Setter for id.<p>
     */
    public void setId(EmbeddedMoveId id) {
        this.id = id;
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
    public EmbeddedProgressRollMoveRollType getRollType() {
        return rollType;
    }

    /**
     * Setter for rollType.<p>
     */
    public void setRollType(EmbeddedProgressRollMoveRollType rollType) {
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
     * Getter for tracks.<p>
     * Describes the common features of progress tracks associated with this
     * move.
     */
    public ProgressTrackTypeInfo getTracks() {
        return tracks;
    }

    /**
     * Setter for tracks.<p>
     * Describes the common features of progress tracks associated with this
     * move.
     */
    public void setTracks(ProgressTrackTypeInfo tracks) {
        this.tracks = tracks;
    }

    /**
     * Getter for trigger.<p>
     * Trigger conditions for this move.
     */
    public TriggerProgressRoll getTrigger() {
        return trigger;
    }

    /**
     * Setter for trigger.<p>
     * Trigger conditions for this move.
     */
    public void setTrigger(TriggerProgressRoll trigger) {
        this.trigger = trigger;
    }

    /**
     * Getter for type.<p>
     */
    public EmbeddedProgressRollMoveType getType() {
        return type;
    }

    /**
     * Setter for type.<p>
     */
    public void setType(EmbeddedProgressRollMoveType type) {
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
