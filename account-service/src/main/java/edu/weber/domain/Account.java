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
    private String username;
    @Column
    private String password;
    @Column
    private String schoolId;
    @Column
    private Boolean active;

    public Account(int accountKey, String email, String username, String password, String schoolId, Boolean active) {
        this.accountKey = accountKey;
        this.email = email;
        this.username = username;
        this.password = password;
        this.schoolId = schoolId;
        this.active = active;
    }
    public Account(){}

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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(String schoolId) {
        this.schoolId = schoolId;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}
