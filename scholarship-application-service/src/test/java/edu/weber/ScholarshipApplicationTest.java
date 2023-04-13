package edu.weber;

import edu.weber.model.*;
import edu.weber.controller.*;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;


public class ScholarshipApplicationTest {
    private ScholarshipApplication scholarshipApplication;
    private ScholarshipApplicationEvaluation scholarshipAppEval;

    @Before
    @Test
    public void TestScholarshipSetup() {
        int test_account_key = 10;
        int test_scholarship_id = 15;

        String test_application_status = "test";

        LocalDateTime test_date_submitted = LocalDateTime.now();
        LocalDateTime test_date_decided = LocalDateTime.now();

        scholarshipApplication = new ScholarshipApplication(test_account_key, test_scholarship_id);

        scholarshipApplication.setScholarshipApplicationStatus(test_application_status);
        scholarshipApplication.setDateSubmitted(test_date_submitted);
        scholarshipApplication.setDateDecided(test_date_decided);

        Assert.assertNotNull(scholarshipApplication.getScholarshipApplicationId());
        Assert.assertEquals(scholarshipApplication.getScholarshipId(), test_scholarship_id);
        Assert.assertEquals(scholarshipApplication.getAccountKey(), test_account_key);

        Assert.assertEquals(scholarshipApplication.getScholarshipApplicationStatus(), test_application_status);
        Assert.assertEquals(scholarshipApplication.getDateSubmitted(), test_date_submitted);
        Assert.assertEquals(scholarshipApplication.getDateDecided(), test_date_decided);

        int scholarship_application_id = scholarshipApplication.getScholarshipApplicationId();

        String test_to_str = "ScholarshipApplication{ " +
                "scholarshipApplicationID='" + scholarship_application_id + '\'' +
                ", accountKey='" + test_account_key + '\'' +
                ", scholarshipId='" + test_scholarship_id + '\'' +
                ", dateSubmitted='" + test_date_submitted + '\'' +
                ", dateDecided='" + test_date_decided + '\'' +
                '}';

        Assert.assertEquals(scholarshipApplication.toString(), test_to_str);
    }

    @Test
    public void TestScholarshipApplicationEvaluation() {
        // Constructor variables
        int test_scholarship_application_id = 15;
        String test_evaluation_comment = "Evaluation comment";
        int test_evaluation_rating = 5;

        // Date evaluated test
        LocalDateTime test_date_evaluated = LocalDateTime.now();

        scholarshipAppEval = new ScholarshipApplicationEvaluation(test_scholarship_application_id,
                test_evaluation_comment, test_evaluation_rating);

        scholarshipAppEval.setDateEvaluated(test_date_evaluated);

        Assert.assertNotNull(scholarshipAppEval.getEvaluationId());
        Assert.assertEquals(scholarshipAppEval.getScholarshipApplicationId(), test_scholarship_application_id);

        Assert.assertEquals(scholarshipAppEval.getEvaluationComment(), test_evaluation_comment);
        Assert.assertEquals(scholarshipAppEval.getEvaluationRating(), test_evaluation_rating);

        Assert.assertEquals(scholarshipAppEval.getDateEvaluated(), test_date_evaluated);

        int evaluation_id = scholarshipAppEval.getEvaluationId();

        String test_to_str = "Application Evaluation{ " +
                "evaluationID='" + evaluation_id + '\'' +
                ", scholarshipApplicationId='" + test_scholarship_application_id + '\'' +
                ", evaluationComment='" + test_evaluation_comment + '\'' +
                ", evaluationRating='" + test_evaluation_rating + '\'' +
                '}';

        Assert.assertEquals(scholarshipAppEval.toString(), test_to_str);
    }

}
