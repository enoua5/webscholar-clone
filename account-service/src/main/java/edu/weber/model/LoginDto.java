package edu.weber.model;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

/**
 * Used to send login info to the backend.
 * This is more efficient than sending the entire account object
 * everytime login info needs to be verified.
 */
@Getter
public class LoginDto {

    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @Override
    public String toString() {
        return "LoginDto{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
