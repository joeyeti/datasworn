// Code generated by jtd-codegen for Java + Jackson v0.2.1

package Datasworn;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * Represents an input that accepts plain text.
 */
@JsonSerialize
public class AssetAbilityOptionFieldText extends AssetAbilityOptionField {
    @JsonProperty("id")
    private AssetAbilityOptionFieldId id;

    @JsonProperty("label")
    private Label label;

    @JsonProperty("value")
    private String value;

    public AssetAbilityOptionFieldText() {
    }

    /**
     * Getter for id.<p>
     * The unique Datasworn ID for this item.
     */
    public AssetAbilityOptionFieldId getId() {
        return id;
    }

    /**
     * Setter for id.<p>
     * The unique Datasworn ID for this item.
     */
    public void setId(AssetAbilityOptionFieldId id) {
        this.id = id;
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
     */
    public String getValue() {
        return value;
    }

    /**
     * Setter for value.<p>
     */
    public void setValue(String value) {
        this.value = value;
    }
}
