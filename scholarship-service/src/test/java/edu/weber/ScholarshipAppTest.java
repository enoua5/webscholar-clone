package edu.weber;

import edu.weber.model.Scholarship;
import edu.weber.service.ScholarshipService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;


/**
 * Unit test for simple App.
 */

public class ScholarshipAppTest
{
    @Autowired
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
        double amount = 500;

        TestScholarship = new Scholarship(title, organization, description, requirements, amount);
        Assert.assertEquals(title, TestScholarship.getTitle());
        Assert.assertEquals(organization, TestScholarship.getOrganization());
        Assert.assertEquals(description, TestScholarship.getDescription());
        Assert.assertEquals(requirements, TestScholarship.getRequirements());
        Assert.assertEquals(amount, TestScholarship.getAmount(), 0);
    }


    @Test
    public void testScholarshipToString()
    {
        String testForNull = TestScholarship.toString();
        Assert.assertNotNull("To string returned a null", testForNull);
    }

}

