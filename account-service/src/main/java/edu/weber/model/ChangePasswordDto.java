package edu.weber.model;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

/**
 * This class can be used to verify the current password, and create
 * a new password for the currently logged-in user.
 * String currentPassword: The user's current password
 * String newPassword: The new password the user would like to set
 */
@Getter
public class ChangePasswordDto {

    @NotBlank
    private String currentPassword;

    @NotBlank
    private String newPassword;
}