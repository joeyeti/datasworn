// Code generated by jtd-codegen for Java + Jackson v0.2.1

package Datasworn;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * A JSON schema representing a single value (or reference) that's possible
 * to represent
 */
public class SafeValueSchema {
    @JsonValue
    private Object value;

    public SafeValueSchema() {
    }

    @JsonCreator
    public SafeValueSchema(Object value) {
        this.value = value;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }
}
