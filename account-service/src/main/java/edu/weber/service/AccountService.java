package edu.weber.service;

import edu.weber.domain.Account;
//import edu.weber.domain.User;

public interface AccountService {

    /**
     * Finds account by given name
     *
     * @param key
     * @return found account
     */
    Account findByKey(int key);

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
     * @param key
     * @param update
     */
    void saveChanges(int key, Account update);
}
