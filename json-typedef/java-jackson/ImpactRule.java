// Code generated by jtd-codegen for Java + Jackson v0.2.1

package Datasworn;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.util.List;

/**
 * Describes a standard impact/debility.
 */
@JsonSerialize
public class ImpactRule {
    @JsonProperty("description")
    private MarkdownString description;

    @JsonProperty("label")
    private Label label;

    @JsonProperty("permanent")
    private Boolean permanent;

    @JsonProperty("prevents_recovery")
    private List<ConditionMeterKey> preventsRecovery;

    @JsonProperty("shared")
    private Boolean shared;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("tags")
    private Tags tags;

    public ImpactRule() {
    }

    /**
     * Getter for description.<p>
     * A description of this impact.
     */
    public MarkdownString getDescription() {
        return description;
    }

    /**
     * Setter for description.<p>
     * A description of this impact.
     */
    public void setDescription(MarkdownString description) {
        this.description = description;
    }

    /**
     * Getter for label.<p>
     * The label for this impact.
     */
    public Label getLabel() {
        return label;
    }

    /**
     * Setter for label.<p>
     * The label for this impact.
     */
    public void setLabel(Label label) {
        this.label = label;
    }

    /**
     * Getter for permanent.<p>
     * Is this impact permanent?
     */
    public Boolean getPermanent() {
        return permanent;
    }

    /**
     * Setter for permanent.<p>
     * Is this impact permanent?
     */
    public void setPermanent(Boolean permanent) {
        this.permanent = permanent;
    }

    /**
     * Getter for preventsRecovery.<p>
     * Any ruleset condition meters that can't recover when this impact is
     * active.
     */
    public List<ConditionMeterKey> getPreventsRecovery() {
        return preventsRecovery;
    }

    /**
     * Setter for preventsRecovery.<p>
     * Any ruleset condition meters that can't recover when this impact is
     * active.
     */
    public void setPreventsRecovery(List<ConditionMeterKey> preventsRecovery) {
        this.preventsRecovery = preventsRecovery;
    }

    /**
     * Getter for shared.<p>
     * Is this impact applied to all players at once?
     */
    public Boolean getShared() {
        return shared;
    }

    /**
     * Setter for shared.<p>
     * Is this impact applied to all players at once?
     */
    public void setShared(Boolean shared) {
        this.shared = shared;
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
