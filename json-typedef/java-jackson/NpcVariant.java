// Code generated by jtd-codegen for Java + Jackson v0.2.1

package Datasworn;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class NpcVariant {
    @JsonProperty("_id")
    private NpcVariantId id;

    @JsonProperty("description")
    private MarkdownString description;

    @JsonProperty("name")
    private Label name;

    @JsonProperty("nature")
    private NpcNature nature;

    @JsonProperty("rank")
    private ChallengeRank rank;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("_comment")
    private Documentation comment;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("summary")
    private MarkdownString summary;

    public NpcVariant() {
    }

    /**
     * Getter for id.<p>
     * The unique Datasworn ID for this node.
     */
    public NpcVariantId getId() {
        return id;
    }

    /**
     * Setter for id.<p>
     * The unique Datasworn ID for this node.
     */
    public void setId(NpcVariantId id) {
        this.id = id;
    }

    /**
     * Getter for description.<p>
     */
    public MarkdownString getDescription() {
        return description;
    }

    /**
     * Setter for description.<p>
     */
    public void setDescription(MarkdownString description) {
        this.description = description;
    }

    /**
     * Getter for name.<p>
     */
    public Label getName() {
        return name;
    }

    /**
     * Setter for name.<p>
     */
    public void setName(Label name) {
        this.name = name;
    }

    /**
     * Getter for nature.<p>
     */
    public NpcNature getNature() {
        return nature;
    }

    /**
     * Setter for nature.<p>
     */
    public void setNature(NpcNature nature) {
        this.nature = nature;
    }

    /**
     * Getter for rank.<p>
     * The suggested challenge rank for this NPC.
     */
    public ChallengeRank getRank() {
        return rank;
    }

    /**
     * Setter for rank.<p>
     * The suggested challenge rank for this NPC.
     */
    public void setRank(ChallengeRank rank) {
        this.rank = rank;
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
     * Getter for summary.<p>
     */
    public MarkdownString getSummary() {
        return summary;
    }

    /**
     * Setter for summary.<p>
     */
    public void setSummary(MarkdownString summary) {
        this.summary = summary;
    }
}
