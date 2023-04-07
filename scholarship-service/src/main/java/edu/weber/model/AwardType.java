package edu.weber.model;

import javax.persistence.*;

@Entity
public class AwardType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int awardTypeId;

    @ManyToOne
    @JoinColumn(name = "scholarshipId", nullable = false)
    private Scholarship scholarship;

    @Column(nullable = false)
    private AwardTypeEnum awardType;

    public AwardType() {}

    public AwardType(Scholarship scholarship, AwardTypeEnum awardType) {
        this.scholarship = scholarship;
        this.awardType = awardType;
    }

    public int getAwardTypeId() {
        return awardTypeId;
    }

    public void setAwardTypeId(int awardTypeId) {
        this.awardTypeId = awardTypeId;
    }

    public Scholarship getScholarship() {
        return scholarship;
    }

    public void setScholarship(Scholarship scholarship) {
        this.scholarship = scholarship;
    }

    public AwardTypeEnum getAwardType() {
        return awardType;
    }

    public void setAwardType(AwardTypeEnum awardType) {
        this.awardType = awardType;
    }
}
