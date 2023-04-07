package edu.weber;

import edu.weber.model.*;
import edu.weber.service.ScholarshipService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.math.BigDecimal;
import java.sql.Array;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


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
        List<Requirement> requirements = new ArrayList<Requirement>();
        List<Level> levels = new ArrayList<Level>();
        List<AwardType> awards = new ArrayList<AwardType>();
        BigDecimal amount = BigDecimal.valueOf(500);


        Timestamp deadline = Timestamp.valueOf(LocalDateTime.of(2023, Month.DECEMBER, 31,23,59));

        TestScholarship = new Scholarship(title, organization, description, requirements, amount, deadline, levels, awards);
        Assert.assertEquals(title, TestScholarship.getTitle());
        Assert.assertEquals(organization, TestScholarship.getOrganization());
        Assert.assertEquals(description, TestScholarship.getDescription());
        Assert.assertEquals(requirements, TestScholarship.getRequirements());
        Assert.assertEquals(amount, TestScholarship.getAmount());
        Assert.assertEquals(deadline, TestScholarship.getApplyDeadline());
        Assert.assertEquals(levels, TestScholarship.getLevels());
        Assert.assertEquals(awards, TestScholarship.getAwards());
    }


    @Test
    public void testScholarshipToString()
    {
        String testForNull = TestScholarship.toString();
        Assert.assertNotNull("To string returned a null", testForNull);
    }

    @Test
    public void testRequirement()
    {
        String description = "Test";
        Requirement TestRequirement = new Requirement(TestScholarship, description);

        Assert.assertNotNull(TestRequirement.getRequirementId());
        Assert.assertNotNull(TestRequirement.getScholarship());
        Assert.assertEquals(TestRequirement.getDescription(), description);
    }

    @Test
    public void testLevel()
    {
        Level test;
        for (LevelEnum e: LevelEnum.values()) {
            test = new Level(TestScholarship, e);

            Assert.assertEquals(test.getLevel(), e);
            Assert.assertNotNull(test.getLevelId());
            Assert.assertEquals(test.getScholarship(), TestScholarship);

        }

    }
}

