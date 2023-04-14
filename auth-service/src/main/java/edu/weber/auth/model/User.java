package edu.weber.auth.model;

import javax.persistence.*;
import java.io.Serializable;


public class User implements Serializable {

	private String userName;

	private String password;
	
	private String role;

	public User() {
		super();
	}

	/**
	 * Creates a user for LOGIN
	 *
	 * @param userName the username
	 * @param password the user password
	 *
	 * @throws IllegalArgumentException if any of the input parameters are null or empty
	 */
	public User(String userName, String password) {
		if (userName == null || userName.trim().isEmpty()) {
			throw new IllegalArgumentException("userName cannot be empty");
		}
		if (password == null || password.trim().isEmpty()) {
			throw new IllegalArgumentException("password cannot be empty");
		}
		this.userName = userName;
		this.password = password;
	}

	// All the methods below implement CRUD functionality.

	public void setRole(String role) {
		this.role = role;
	}

	public String getUserName() {
		return userName;
	}

	public String getPassword() {
		return password;
	}

}
