package edu.weber.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Account {

    @Id
    private int accountKey;
    @Column
    private String email;
    @Column
    private String encryptedPassword;
    @Column
    private String saltPassword;
    @Column
    private Boolean active;

    public int getAccountKey() {
        return accountKey;
    }

    public void setAccountKey(int accountKey) {
        this.accountKey = accountKey;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEncryptedPassword() {
        return encryptedPassword;
    }

    public void setEncryptedPassword(String encryptedPassword) {
        this.encryptedPassword = encryptedPassword;
    }

    public String getSaltPassword() {
        return saltPassword;
    }

    public void setSaltPassword(String saltPassword) {
        this.saltPassword = saltPassword;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}
