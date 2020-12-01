package edu.weber.service;

import edu.weber.domain.Account;
import edu.weber.repository.AccountRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.ArrayList;

public class AccountServiceImpl implements AccountService {

    private final Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Account findByKey(int accountKey) {
        return accountRepository.findAccountByAccountKey(accountKey);
    }

    @Override
    public Account create(Account account) {
        return accountRepository.save(account);
    }


    @Override
    public void saveChanges(int accountKey, Account update) {
        Account account = accountRepository.findAccountByAccountKey(accountKey);
        Assert.notNull(account, "can't find account with name " + accountKey);

        account.setEmail(update.getEmail());
        account.setUsername(update.getUsername());
        account.setPassword(update.getPassword());
        account.setSchoolId(update.getSchoolId());
        account.setActive(update.getActive());
        accountRepository.save(account);
    }

}
