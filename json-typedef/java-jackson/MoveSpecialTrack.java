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
public class MoveSpecialTrack extends Move {
    @JsonProperty("_id")
    private MoveId id;

    @JsonProperty("_source")
    private SourceInfo source;

    @JsonProperty("name")
    private Label name;

    @JsonProperty("outcomes")
    private MoveOutcomes outcomes;

    @JsonProperty("text")
    private MarkdownString text;

    @JsonProperty("trigger")
    private TriggerSpecialTrack trigger;

    @JsonProperty("type")
    private MoveSpecialTrackType type;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("_comment")
    private String comment;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("canonical_name")
    private Label canonicalName;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("oracles")
    private List<OracleRollableId> oracles;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("replaces")
    private MoveId replaces;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("suggestions")
    private Suggestions suggestions;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("tags")
    private Map<String, Map<String, Tag>> tags;

    public MoveSpecialTrack() {
    }

    /**
     * Getter for id.<p>
     * The unique Datasworn ID for this item.
     */
    public MoveId getId() {
        return id;
    }

    /**
     * Setter for id.<p>
     * The unique Datasworn ID for this item.
     */
    public void setId(MoveId id) {
        this.id = id;
    }

    /**
     * Getter for source.<p>
     * Attribution for the original source (such as a book or website) of this
     * item, including the author and licensing information.
     */
    public SourceInfo getSource() {
        return source;
    }

    /**
     * Setter for source.<p>
     * Attribution for the original source (such as a book or website) of this
     * item, including the author and licensing information.
     */
    public void setSource(SourceInfo source) {
        this.source = source;
    }

    /**
     * Getter for name.<p>
     * The primary name/label for this item.
     */
    public Label getName() {
        return name;
    }

    /**
     * Setter for name.<p>
     * The primary name/label for this item.
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
    public MoveSpecialTrackType getType() {
        return type;
    }

    /**
     * Setter for type.<p>
     */
    public void setType(MoveSpecialTrackType type) {
        this.type = type;
    }

    /**
     * Getter for comment.<p>
     * Any implementation hints or other developer-facing comments on this
     * object. These should be omitted when presenting the object for gameplay.
     */
    public String getComment() {
        return comment;
    }

    /**
     * Setter for comment.<p>
     * Any implementation hints or other developer-facing comments on this
     * object. These should be omitted when presenting the object for gameplay.
     */
    public void setComment(String comment) {
        this.comment = comment;
    }

    /**
     * Getter for canonicalName.<p>
     * The name of this item as it appears on the page in the book, if it's
     * different from `name`.
     */
    public Label getCanonicalName() {
        return canonicalName;
    }

    /**
     * Setter for canonicalName.<p>
     * The name of this item as it appears on the page in the book, if it's
     * different from `name`.
     */
    public void setCanonicalName(Label canonicalName) {
        this.canonicalName = canonicalName;
    }

    /**
     * Getter for oracles.<p>
     * Oracles associated with this move. It's not recommended to roll these
     * automatically, as almost all moves present them as an option, not a
     * requirement.
     */
    public List<OracleRollableId> getOracles() {
        return oracles;
    }

    /**
     * Setter for oracles.<p>
     * Oracles associated with this move. It's not recommended to roll these
     * automatically, as almost all moves present them as an option, not a
     * requirement.
     */
    public void setOracles(List<OracleRollableId> oracles) {
        this.oracles = oracles;
    }

    /**
     * Getter for replaces.<p>
     * Indicates that this move replaces the identified move. References to the
     * replaced move can be considered equivalent to this move.
     */
    public MoveId getReplaces() {
        return replaces;
    }

    /**
     * Setter for replaces.<p>
     * Indicates that this move replaces the identified move. References to the
     * replaced move can be considered equivalent to this move.
     */
    public void setReplaces(MoveId replaces) {
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
    public Map<String, Map<String, Tag>> getTags() {
        return tags;
    }

    /**
     * Setter for tags.<p>
     */
    public void setTags(Map<String, Map<String, Tag>> tags) {
        this.tags = tags;
    }
}
