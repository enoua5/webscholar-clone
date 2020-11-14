package edu.weber.service;

import edu.weber.domain.Account;
import edu.weber.domain.User;
import edu.weber.repository.AccountRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.ArrayList;

public class AccountServiceImpl implements AccountService{

    private final Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Account findByKey(int key) {
        return accountRepository.findByKey(key);
    }

    public Account create(User user) {
        Account existing = accountRepository.findByKey(user.getAccountKey());
        Assert.isNull(existing, "account already exists: " + user.getAccountKey());

        Account account = new Account();
        account.setAccountKey(user.getAccountKey());
        // TODO find out where we are getting email from
        account.setEmail("");

        accountRepository.save(account);

        return account;
    }

    @Override
    public void saveChanges(int key, Account update) {
        Account account = accountRepository.findByKey(key);
        Assert.notNull(account, "can't find account with name " + key);

        account.setEmail(update.getEmail());
        account.setUsername(update.getUsername());
        account.setPassword(update.getPassword());
        account.setSchoolId(update.getSchoolId());
        account.setActive(update.getActive());
        accountRepository.save(account);
    }

}
