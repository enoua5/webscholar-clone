package edu.weber.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Getter // This uses javax validation to generate the getters and setters for all variables
@Setter // This uses javax validation to generate the getters and setters for all variables
@Entity
public class Issue {

    // Gives each issue an id
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )

    // This prevents the javax setter from being generated for this value
    @Setter(AccessLevel.PRIVATE)
    private int issueId;

    // The status of the individual issue. (We might want to consider changing this to an enum).
    @Column(name = "status", nullable = false, length = 50)
    @NotBlank
    private String status;

    // The summary associated with the issue.
    @Column(name = "summary", nullable = false, length = 150)
    @NotBlank
    private String summary;

    // The description associated with the issue
    @Column(name = "description", nullable = false, length = 500)
    @NotBlank
    private String description;

    // The severity associated with an issue.
    @Column(name = "severity", nullable = false, length = 100)
    @NotBlank
    private String severity;

    // The priority of an issue
    @Column(name = "priority", nullable = false, length = 50)
    @NotBlank
    private String priority;

    // Reference to the account that created the issue.
    // (By default, whoever makes the report is inserted into this field)
    @ManyToOne(optional = false)
    @JoinColumn(name = "reporterId", nullable = false)
    @NotBlank
    private Account reporterId;

    // Reference to the account who is working on the issue
    @ManyToOne
    @JoinColumn(name = "workerId")
    @NotBlank
    private Account workerId;

    /**
     * Custom constructor for a new issue
     *
     * @param status      // The status associated with an issue
     * @param summary     // The summary associated with an issue
     * @param description // The description associated with an issue
     * @param severity    // The severity associated with an issue
     * @param priority    // The priority associated with an issue
     * @param reporter    // The reporter who created the issue
     */
    public Issue(String status, String summary, String description, String severity, String priority, Account reporter) {
        this.status = status;
        this.summary = summary;
        this.description = description;
        this.severity = severity;
        this.priority = priority;
        this.reporterId = reporter;
    }

    // Default Constructor that SHOULDN'T run. We should always use the one above
    public Issue() {
        this.status = "N/A";
        this.summary = "N/A";
        this.description = "N/A";
        this.severity = "N/A";
        this.priority = "N/A";
        this.reporterId = new Account();
    }

    public Account getWorkerId() {
        return workerId;
    }

    public void setWorkerId(Account workerId) {
        this.workerId = workerId;
    }

    public Account getReporterId() {
        return reporterId;
    }

    public void setReporterId(Account reporterId) {
        this.reporterId = reporterId;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}