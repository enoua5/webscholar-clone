package edu.weber.model;

/**
 * RoleRequest: encapsulates selected members of an Account to
 * transfer a list of non-sensitive data to the frontend for role request view
 * and approval.
 *
 * Note that this does NOT implement JPA or javax and will not appear in the database.
 */
public class RoleRequest {
    private int accountId;
    public int getAccountId() {return accountId;}
    public void setAccountId(int id) {accountId = id;}

    private String firstName;
    public String getFirstName() {return firstName;}
    public void setFirstName(String firstName) {this.firstName = firstName;}

    private String lastName;
    public String getLastName() {return lastName;}
    public void setLastName(String lastName) {this.lastName = lastName;}

    private String email;
    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}

    //Will be set based on an AccountRoles value
    private String role;
    public String getRole() {return role;}
    public void setRole(String role) {this.role = role;}

    private boolean isApproved;
    public boolean isApproved() {return isApproved;}
    public void setIsApproved(boolean isApproved) {this.isApproved = isApproved;}


}
