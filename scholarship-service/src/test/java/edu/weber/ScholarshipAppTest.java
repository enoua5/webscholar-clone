package edu.weber;

import edu.weber.model.AwardType;
import edu.weber.model.Level;
import edu.weber.model.Scholarship;
import edu.weber.service.ScholarshipService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.Month;


/**
 * Unit test for simple App.
 */

public class ScholarshipAppTest
{
    private ScholarshipService scholarshipService;
    private Scholarship TestScholarship;

    @Before
    @Test
    public void testScholarshipSetup()
    {
        String title = "Test";
        String organization = "Weber";
        String description = "Test";
        String requirements = "Test";
        BigDecimal amount = BigDecimal.valueOf(500);


        Timestamp deadline = Timestamp.valueOf(LocalDateTime.of(2023, Month.DECEMBER, 31,23,59));
        Level[] levels = {Level.BACHELOR, Level.ASSOCIATE};
        AwardType[] awardTypes = {AwardType.SCHOLARSHIP, AwardType.LOAN, AwardType.PRIZE};
       /* ArrayList<Level> levels = new ArrayList<>();
        levels.add(Level.BACHELOR);
        levels.add(Level.ASSOCIATE);*/

        TestScholarship = new Scholarship(title, organization, description, requirements, amount, deadline, levels, awardTypes);
        Assert.assertEquals(title, TestScholarship.getTitle());
        Assert.assertEquals(organization, TestScholarship.getOrganization());
        Assert.assertEquals(description, TestScholarship.getDescription());
        Assert.assertEquals(requirements, TestScholarship.getRequirements());
        Assert.assertEquals(amount, TestScholarship.getAmount());
        Assert.assertEquals(deadline, TestScholarship.getApplyDeadline());
        Assert.assertEquals(levels, TestScholarship.getLevels());
        Assert.assertEquals(awardTypes, TestScholarship.getAwardType());
    }


    @Test
    public void testScholarshipToString()
    {
        String testForNull = TestScholarship.toString();
        Assert.assertNotNull("To string returned a null", testForNull);
    }

}

