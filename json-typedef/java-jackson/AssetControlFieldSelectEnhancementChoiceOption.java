// Code generated by jtd-codegen for Java + Jackson v0.2.1

package Datasworn;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * Represents an option in a list of choices.
 */
@JsonSerialize
public class AssetControlFieldSelectEnhancementChoiceOption extends AssetControlFieldSelectEnhancementChoice {
    @JsonProperty("label")
    private Label label;

    @JsonProperty("value")
    private AssetControlFieldSelectEnhancementChoiceOptionValue value;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("selected")
    private Boolean selected;

    public AssetControlFieldSelectEnhancementChoiceOption() {
    }

    /**
     * Getter for label.<p>
     * A localized label for this input. In some contexts it may be undesirable
     * to render this text, but it should always be exposed to assistive
     * technology (e.g. with `aria-label` in HTML).
     */
    public Label getLabel() {
        return label;
    }

    /**
     * Setter for label.<p>
     * A localized label for this input. In some contexts it may be undesirable
     * to render this text, but it should always be exposed to assistive
     * technology (e.g. with `aria-label` in HTML).
     */
    public void setLabel(Label label) {
        this.label = label;
    }

    /**
     * Getter for value.<p>
     * The current value of this input.
     */
    public AssetControlFieldSelectEnhancementChoiceOptionValue getValue() {
        return value;
    }

    /**
     * Setter for value.<p>
     * The current value of this input.
     */
    public void setValue(AssetControlFieldSelectEnhancementChoiceOptionValue value) {
        this.value = value;
    }

    /**
     * Getter for selected.<p>
     * Is this option currently selected?
     */
    public Boolean getSelected() {
        return selected;
    }

    /**
     * Setter for selected.<p>
     * Is this option currently selected?
     */
    public void setSelected(Boolean selected) {
        this.selected = selected;
    }
}
