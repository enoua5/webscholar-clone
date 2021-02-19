package edu.weber.service;

import edu.weber.domain.Account;

//TODO: Find out why these very specific interface was made. Why not just put this code in 'AccountServiceImpl'?
public interface AccountService {

    /**
     * Finds account by given name
     *
     * @param accountKey
     * @return found account
     */
    Account findByKey(int accountKey);

    /**
     * Checks if account with the same name already exists
     * Invokes Auth Service user creation
     * Creates new account with default parameters
     *
     * @param account
     * @return created account
     */
    Account create(Account account);

    /**
     * Validates and applies incoming account updates
     * Invokes Statistics Service update
     *
     * @param accountKey
     * @param update
     */
    void saveChanges(int accountKey, Account update);
}
