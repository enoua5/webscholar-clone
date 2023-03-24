package edu.weber.auth.model;

import java.io.Serial;
import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * Represents the user's role
 */
@Entity
@Table(name="user_role")
public class Role implements  Serializable{
	
	@Serial
	private static final long serialVersionUID = 1567637283572978119L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="role_id")
	private int roleId; // Generated by the database
	
	@Column(name="role_name")
	private String roleName;

	/**
	 * The set of permissions granted by this role.
	 */
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "role_permission",
            joinColumns = {@JoinColumn(name = "role_id")},
            inverseJoinColumns = {@JoinColumn(name = "permission_id")}
    )

	private Set<Permission> permissions;

	/**
	 * The set of users assigned to this role.
	 */
	@OneToMany(cascade=CascadeType.ALL)
    @JoinColumn(name="role_id")
	private Set<User> users;

	/**
	 * Creates a new, empty role.
	 */
	public Role() {
		super();
	}

	/**
	 * Role Constructor
	 *
	 * @param roleName The name of the role.
	 * @param permissions The set of permissions granted by the role.
	 */
	public Role(String roleName, Set<Permission> permissions) {
		super();
		if (roleName == null || roleName.trim().isEmpty()) {
			throw new IllegalArgumentException("Role name must not be null or empty");
		}
		if (permissions == null) {
			throw new IllegalArgumentException("Permissions set must not be null");
		}
		this.roleName = roleName;
		this.permissions = permissions;
	}

	// All the methods below implement CRUD functionality.

	public int getRoleId() {
		return roleId;
	}

	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public Set<Permission> getPermissions() {
		return permissions;
	}

	public void setPermissions(Set<Permission> permissions) {
		this.permissions = permissions;
	}

	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}

	
}
