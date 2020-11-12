package edu.weber.controller;

import edu.weber.domain.Account;
import edu.weber.domain.User;
import edu.weber.service.AccountService;
import org.springframework.web.bind.annotation.*;

@RestController
public class AccountController {

    private AccountService accountService;

    @RequestMapping(path = "/{key}", method = RequestMethod.GET)
    public Account getAccountByKey(@PathVariable int key) {
        return accountService.findByKey(key);
    }

    @RequestMapping(path = "/", method = RequestMethod.POST)
    public Account createNewAccount(@RequestBody User user) {
        return accountService.create(user);
    }

    @RequestMapping(path = "/update/{key}", method = RequestMethod.POST)
    public void saveChanges(@PathVariable int key, @RequestBody Account update) {
        accountService.saveChanges(key, update);
    }
}
