// Code generated by jtd-codegen for Java + Jackson v0.2.1

package Datasworn;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.util.List;

/**
 * Represents a row in an oracle table, with a single text cell.
 */
@JsonSerialize
public class DelveSiteThemeDanger {
    @JsonProperty("_id")
    private DelveSiteThemeDangerId id;

    @JsonProperty("roll")
    private DiceRange roll;

    @JsonProperty("text")
    private MarkdownString text;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("_i18n")
    private I18nHints i18n;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("embed_table")
    private OracleRollableId embedTable;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("icon")
    private SvgImageUrl icon;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("oracle_rolls")
    private List<OracleRoll> oracleRolls;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("suggestions")
    private Suggestions suggestions;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("tags")
    private Tags tags;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("template")
    private OracleRollTemplate template;

    public DelveSiteThemeDanger() {
    }

    /**
     * Getter for id.<p>
     */
    public DelveSiteThemeDangerId getId() {
        return id;
    }

    /**
     * Setter for id.<p>
     */
    public void setId(DelveSiteThemeDangerId id) {
        this.id = id;
    }

    /**
     * Getter for roll.<p>
     */
    public DiceRange getRoll() {
        return roll;
    }

    /**
     * Setter for roll.<p>
     */
    public void setRoll(DiceRange roll) {
        this.roll = roll;
    }

    /**
     * Getter for text.<p>
     * The primary text content of this row.
     */
    public MarkdownString getText() {
        return text;
    }

    /**
     * Setter for text.<p>
     * The primary text content of this row.
     */
    public void setText(MarkdownString text) {
        this.text = text;
    }

    /**
     * Getter for i18n.<p>
     */
    public I18nHints getI18n() {
        return i18n;
    }

    /**
     * Setter for i18n.<p>
     */
    public void setI18n(I18nHints i18n) {
        this.i18n = i18n;
    }

    /**
     * Getter for embedTable.<p>
     * Hints that the identified table should be rendered inside this table row.
     */
    public OracleRollableId getEmbedTable() {
        return embedTable;
    }

    /**
     * Setter for embedTable.<p>
     * Hints that the identified table should be rendered inside this table row.
     */
    public void setEmbedTable(OracleRollableId embedTable) {
        this.embedTable = embedTable;
    }

    /**
     * Getter for icon.<p>
     */
    public SvgImageUrl getIcon() {
        return icon;
    }

    /**
     * Setter for icon.<p>
     */
    public void setIcon(SvgImageUrl icon) {
        this.icon = icon;
    }

    /**
     * Getter for oracleRolls.<p>
     * Further oracle rolls prompted by this table row.
     */
    public List<OracleRoll> getOracleRolls() {
        return oracleRolls;
    }

    /**
     * Setter for oracleRolls.<p>
     * Further oracle rolls prompted by this table row.
     */
    public void setOracleRolls(List<OracleRoll> oracleRolls) {
        this.oracleRolls = oracleRolls;
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

    /**
     * Getter for template.<p>
     */
    public OracleRollTemplate getTemplate() {
        return template;
    }

    /**
     * Setter for template.<p>
     */
    public void setTemplate(OracleRollTemplate template) {
        this.template = template;
    }
}
