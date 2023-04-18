package edu.weber;

import edu.weber.model.Account;
import edu.weber.model.AccountRoles;
import edu.weber.repository.AccountRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import edu.weber.service.AccountService;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


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
//    @Autowired
    private AccountService accountService;
    private AccountRepository accountRepository;
    private BCryptPasswordEncoder passwordEncoder;
    private JavaMailSender emailSender;

    /**Test setup
     * Creates account
     * Canary checks to make sure test environment is ready for action
     * The @Before annotation means this method will run before every test method.
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

        // Mock the repository
        accountRepository = mock(AccountRepository.class);

        // Mock the emailSender
        emailSender = mock(JavaMailSender.class);

        // Instantiate a password encoder
        passwordEncoder = new BCryptPasswordEncoder();

        // Assign these mock services to a new accountService
        accountService = new AccountService();
        accountService.accountRepository = accountRepository;
        accountService.passwordEncoder = passwordEncoder;
        accountService.emailSender = emailSender;
    }

    /**
     * This tests account creation
     */
    @Test
    public void testAccountCreate()
    {
        // mock method calls
        when(accountRepository.findAccountByEmail("test@test.com")).thenReturn(account);
        when(accountRepository.save(account)).thenReturn(account);

        // Create a new account and test
        Account createdAccount = accountService.createNewAccount(account);

        // Make sure an account was created
        Assert.assertNotNull("Account not created", createdAccount);
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
        // Mock the service
        accountService = mock(AccountService.class);

        Assert.assertNotNull(account);

        // Account setup
        account.setEmail("test@testUpdate.com");
        account.setPassword("Password");
        account.setSchoolId("W12345678");
        account.setFirstName("FirstName");
        account.setLastName("LastName");
        account.setRole(AccountRoles.student);
        account.setCity("City");
        account.setState("State");
        account.setZipCode("12346");

        // mock method calls
        when(accountService.createNewAccount(account)).thenReturn(account);

        // Create a new account and test
        Account testAccount = accountService.createNewAccount(account);
        Assert.assertNotNull("Account not created", testAccount);

        //Tests testAccount info
        Assert.assertEquals("Email not equal","test@testUpdate.com", testAccount.getEmail());
        Assert.assertEquals("Password not equal","Password", testAccount.getPassword());
        Assert.assertEquals("School Id not equal","W12345678", testAccount.getSchoolId());
        Assert.assertTrue("Account not active", testAccount.getIsLoggedIn());
        Assert.assertEquals("Usertype not equal",AccountRoles.student, testAccount.getRole());
        Assert.assertEquals("First name not equal","FirstName", testAccount.getFirstName());
        Assert.assertEquals("Last name not equal","LastName", testAccount.getLastName());
        Assert.assertEquals("City not equal","City", testAccount.getCity());
        Assert.assertEquals("State not equal","State", testAccount.getState());
        Assert.assertEquals("Zip not equal","12346", testAccount.getZipCode());

        //give the account new info
        account.setEmail("test2@testUpdate.com");
        account.setCity("FakeCity");
        account.setState("FakeState");
        account.setZipCode("1000101");

        //update the account
        accountService.updateProfile(testAccount.getAccountKey(), account);

        //now check that the account has been properly updated
        Assert.assertEquals("Email not equal","test2@testUpdate.com", testAccount.getEmail());
        Assert.assertEquals("Password not equal","Password", testAccount.getPassword());
        Assert.assertEquals("School Id not equal","W12345678", testAccount.getSchoolId());
        Assert.assertTrue("Account not active", testAccount.getIsLoggedIn());
        Assert.assertEquals("Usertype not equal",AccountRoles.student, testAccount.getRole());
        Assert.assertEquals("First name not equal","FirstName", testAccount.getFirstName());
        Assert.assertEquals("Last name not equal","LastName", testAccount.getLastName());
        Assert.assertEquals("City not equal","FakeCity", testAccount.getCity());
        Assert.assertEquals("State not equal","FakeState", testAccount.getState());
        Assert.assertEquals("Zip not equal","1000101", testAccount.getZipCode());

    }
}

