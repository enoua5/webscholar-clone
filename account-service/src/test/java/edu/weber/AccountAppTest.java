package edu.weber;

import edu.weber.model.Account;
import edu.weber.model.AccountRoles;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import edu.weber.service.AccountService;


/**
 * Unit test for AccountApp
 */
public class AccountAppTest
{
    /**
     * This is the declared repository. Note that it does not have to be
     * instantiated. This is because the '@Autowired' annotation tells
     * spring to inject the instance at run time.
     */
    @Autowired
    private AccountService accountService;

    /**Test setup
     * Creates account
     * Canary checks to make sure test environment is ready for action
     */
    private Account account = new Account();
    @Before
    @Test
    public void testAccountSetup()
    {
        Assert.assertNotNull(account);

        account.setEmail("test@test.com");
        account.setPassword("TestPassword");
        account.setSchoolId("12345678");
        account.setIsLoggedIn(true);
        account.setRole(AccountRoles.student);
        account.setFirstName("TestFirstName");
        account.setLastName("TestLastName");
        account.setCity("TestCity");
        account.setState("TestState");
        account.setZipCode("12345");

        //Tests accounts info
        Assert.assertEquals("Email not equal","test@test.com", account.getEmail());
        Assert.assertEquals("Password not equal","TestPassword", account.getPassword());
        Assert.assertEquals("School Id not equal","12345678", account.getSchoolId());
        Assert.assertTrue("Account not active", account.getIsLoggedIn());
        Assert.assertEquals("Role not equal", AccountRoles.student, account.getRole());
        Assert.assertEquals("First name not equal","TestFirstName", account.getFirstName());
        Assert.assertEquals("Last name not equal","TestLastName", account.getLastName());
        Assert.assertEquals("City not equal","TestCity", account.getCity());
        Assert.assertEquals("State not equal","TestState", account.getState());
        Assert.assertEquals("Zip not equal","12345", account.getZipCode());
    }

    /**
     * This tests account creation
     */
    @Test
    @PostMapping("/make_test_account")
    public void testAccountCreate()
    {
        Assert.assertNotNull(account);

        //TODO: Figure out how to get this working with the database
        //Tests creating account
        //Assert.assertEquals("Accounts are not equal", account, accountService.create(account));
    }

    /**
     * Tests retrieving the account by key
     */
    @Test
    public void testGetAccountByKey()
    {
        Assert.assertNotNull(account);
        //TODO: Figure out how to get this working with the database
        //Tests returning account
        //Assert.assertEquals("Accounts are not equal", account, accountService.findByKey(12345));
    }

    /**
     * Tests updating information on an account and saving it
     */
    @Test
    public void testSaveChanges()
    {
        Assert.assertNotNull(account);

        account.setEmail("test@testUpdate.com");
        account.setPassword("Password");
        account.setSchoolId("W12345678");
        account.setFirstName("FirstName");
        account.setLastName("LastName");
        account.setRole(AccountRoles.student);
        account.setCity("City");
        account.setState("State");
        account.setZipCode("12346");

        //Tests accounts info
        Assert.assertEquals("Email not equal","test@testUpdate.com", account.getEmail());
        Assert.assertEquals("Password not equal","Password", account.getPassword());
        Assert.assertEquals("School Id not equal","W12345678", account.getSchoolId());
        Assert.assertTrue("Account not active", account.getIsLoggedIn());
        Assert.assertEquals("Usertype not equal",AccountRoles.student, account.getRole());
        Assert.assertEquals("First name not equal","FirstName", account.getFirstName());
        Assert.assertEquals("Last name not equal","LastName", account.getLastName());
        Assert.assertEquals("City not equal","City", account.getCity());
        Assert.assertEquals("State not equal","State", account.getState());
        Assert.assertEquals("Zip not equal","12346", account.getZipCode());

        //TODO: Figure out how to get this working with the database
        //Updates account
        //accountService.saveChanges(12345, account);
        //Test returning account by new id
        //Assert.assertEquals("Accounts are not equal", account, accountService.findByKey(12345));
    }
}

