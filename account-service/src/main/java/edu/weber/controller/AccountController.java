package edu.weber.controller;

import com.netflix.discovery.converters.Auto;
import edu.weber.domain.Account;
import edu.weber.service.AccountService;
import edu.weber.service.AccountServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class AccountController {

    @Autowired
    private AccountService accountService;// = new AccountServiceImpl();

    @RequestMapping(path = "/{accountKey}", method = RequestMethod.GET)
    public Account getAccountByKey(@PathVariable int accountKey) {
        return accountService.findByKey(accountKey);
    }

    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public Account login(@RequestParam LoginDto loginDto) {
        return new Account();  //For testing until we see what is comming in.
    }

    @RequestMapping(path = "/", method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Account createNewAccount(@ModelAttribute Account account) {
        if(accountService == null){
            accountService = new AccountServiceImpl();

        }
        return accountService.create(account);
    }

    @RequestMapping(path = "/update/{accountKey}", method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void saveChanges(@PathVariable int accountKey, @ModelAttribute Account update) {
        accountService.saveChanges(accountKey, update);
    }

    @RequestMapping(path = "/test", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public String createNewAccount(@RequestBody MultiValueMap<String, String> formData) {
        //json parsing....
        Account account = new Account();
        account.setEmail(formData.getFirst("email"));
        account.setUsername(formData.getFirst("username"));
        account.setPassword(formData.getFirst("password"));
        account.setSchoolId(formData.getFirst("schoolId"));
        account.setActive(Boolean.parseBoolean(formData.getFirst("active")));

        return account.getEmail();
    }

    @RequestMapping(path = "/test2", method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String createTest2Account(@ModelAttribute Account account) {
        //json parsing....

        return account.getEmail();
    }

    private class FormRaw{
        String oops;

        public FormRaw(String oops) {
            this.oops = oops;
        }

        public String getOops() {
            return oops;
        }

        public void setOops(String oops) {
            this.oops = oops;
        }
    }
}
