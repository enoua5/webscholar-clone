package edu.weber.controller;

import edu.weber.domain.Account;
//import edu.weber.domain.User;
import edu.weber.service.AccountService;
import org.springframework.web.bind.annotation.*;

@RestController
public class AccountController {

    private AccountService accountService;

    @RequestMapping(path = "/{accountKey}", method = RequestMethod.GET)
    public Account getAccountByKey(@PathVariable int accountKey) {
        return accountService.findByKey(accountKey);
    }

    @RequestMapping(path = "/", method = RequestMethod.POST)
    public Account createNewAccount(@RequestBody Account account) {
        return accountService.create(account);
    }

    @RequestMapping(path = "/update/{accountKey}", method = RequestMethod.POST)
    public void saveChanges(@PathVariable int accountKey, @RequestBody Account update) {
        accountService.saveChanges(accountKey, update);
    }
}
