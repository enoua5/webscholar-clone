package edu.weber.auth.model;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;

// TODO
@Entity
@Table(name="user")
public class User implements Serializable {

	/**
	 * This is a data model. It helps us put data into the backend and send data
	 * to the frontend in a standardized format.
	 */
	@Serial
	private static final long serialVersionUID = 1L;

//	private static final long serialVersionUID = 983648238746032841L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="user_id")
	private int userId;
	
	@Column(name="user_name")
	private String userName;
	
	@Column(name="user_password")
	private String password;
	
	@Column(name="user_type")
	private String userType;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinTable(
			name = "user_role",
			joinColumns = {@JoinColumn(name = "role_id")}
	)
	private Role user_role;
	
//	@ManyToMany(mappedBy = "consumers", cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
//	private Set<Utility> utilitites;


	public User() {
		super();
	}

		
	public User(int userId, String userName, String userType, String password) {
		this.userId = userId;
		this.userName = userName;
		this.userType = userType;
		this.password = password;
	}
	
	public User(String userName, String userType, String password) {
		
		this.userName = userName;
		this.password = password;
	}

	public User (User user) {
		super();
		this.userId = user.getUserId();
		this.userName = user.getUserName();
		this.password = user.getPassword();
		this.userType = user.getUserType();
		this.user_role = user.getUser_role();
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public Role getUser_role() {
		return user_role;
	}

	public void setUser_role(Role role) {
		this.user_role = role;
	}
	
}
