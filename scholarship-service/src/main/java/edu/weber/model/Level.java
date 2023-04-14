package edu.weber.model;

import javax.persistence.*;

@Entity
public class Level {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int levelId;

    @ManyToOne
    @JoinColumn(name = "scholarshipId", nullable = false)
    private Scholarship scholarship;

    @Column(nullable = false)
    private LevelEnum level;

    public Level() {}

    public Level(Scholarship scholarship, LevelEnum level) {
        this.scholarship = scholarship;
        this.level = level;
    }

    public int getLevelId() {
        return levelId;
    }

    public void setLevelId(int levelId) {
        this.levelId = levelId;
    }

    public Scholarship getScholarship() {
        return scholarship;
    }

    public void setScholarship(Scholarship scholarship) {
        this.scholarship = scholarship;
    }

    public LevelEnum getLevel() {
        return level;
    }

    public void setLevel(LevelEnum level) {
        this.level = level;
    }
}
