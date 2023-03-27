package edu.weber.model;

import javax.persistence.*;

@Entity
public class Requirement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int requirementId;

    @ManyToOne
    @JoinColumn(name = "scholarshipId", nullable = false)
    private Scholarship scholarship;

    @Column(nullable = false)
    private String description;

    public Requirement() {}

    public Requirement(Scholarship scholarship, String description) {
        this.scholarship = scholarship;
        this.description = description;
    }

    public int getRequirementId() {
        return requirementId;
    }

    public void setRequirementId(int requirementId) {
        this.requirementId = requirementId;
    }

    public Scholarship getScholarship() {
        return scholarship;
    }

    public void setScholarship(Scholarship scholarship) {
        this.scholarship = scholarship;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
