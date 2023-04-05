package edu.weber.model;

import javax.persistence.Id;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class ScholarshipApplicationEvaluation {

    /**
     * This has the Primary Key Generate a unique Id
     */
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private int evaluationId;

    public int getEvaluationId() {return evaluationId}

    /**
     * Foreign Key
     * Links to scholarshipApplicationId the ScholarshipApplication model
     */
    @Column(nullable = false)
    private int scholarshipApplicationId;

    public int getScholarshipApplicationId(){return scholarshipApplicationId}

    public int setScholarshipApplicationId(int scholarshipApplicationId) {
        this.scholarshipApplicationId = scholarshipApplicationId
    }

    /**
     * Stores the evaluation comment from the reviewer
     */
    @Column
    public String evaluationComment;

    public String getEvaluationComment() {
        return evaluationComment;
    }

    public void setEvaluationComment(String evaluationComment) {
        this.evaluationComment = evaluationComment;
    }

    /**
     * Stores the rating or score given in the evaluation
     */
    @Column
    public int evaluationRating;

    public int getEvaluationRating() {
        return evaluationRating;
    }

    public void setEvaluationRating(int evaluationRating) {
        this.evaluationRating = evaluationRating;
    }

    /**
     * Date and time that the
     */
    @Column
    @CreationTimestamp
    public LocalDateTime dateEvaluated;

    public LocalDateTime getDateEvaluated() {
        return dateEvaluated;
    }

    public void setDateEvaluated(LocalDateTime dateEvaluated) {
        this.dateEvaluated = dateEvaluated;
    }

    public ScholarshipApplicationEvaluation(){}

    /**
     * Custom constructor. Creates a ScholarshipApplicationEvaluation object.
     * Parameters are values that must not be blank when this object is created.
     * @param scholarshipApplicationId is the FK ScholarshipApplication for which an Evaluation is being made
     * @param evaluationComment is the comment left by the evaluator
     * @param evaluationRating is the overall rating of the evaluator for the ScholarshipApplication
     */
    public ScholarshipApplicationEvaluation(int scholarshipApplicationId, String evaluationComment, int evaluationRating){
        this.scholarshipApplicationId = scholarshipApplicationId;
        this.evaluationComment = evaluationComment;
        this.evaluationRating = evaluationRating;
    }

    /**
     * This method allows us to see the ScholarshipApplicationEvaluation information in the console.
     * This is helpful for debugging problems or for logging.
     *
     * @return Returns the 'ScholarshipApplicationEvaluation' data formatted as a string.
     */
    @override
    public String toString(){
        return "Application Evaluation{ " +
                "evaluationID=" + evaluationId + '\'' +
                ", scholarshipApplicationId=" + scholarshipApplicationId + '\'' +
                ", evaluationComment=" + evaluationComment + '\'' +
                ", evaluationRating=" + evaluationRating + '\'' +
                '}';
    }
}
