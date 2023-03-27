package edu.weber.auth.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * This class implements the UserDetails interface which is used by Spring Security to provide user
 * authentication and authorization. It is responsible for providing information about the user,
 * such as their username, password, roles, and permissions.
 */
public class UserDetailsImpl implements UserDetails {

	private static final long serialVersionUID = 1L;

	private User user;

	public UserDetailsImpl(User user) {
		if (user == null) {
			throw new IllegalArgumentException("User must not be null");
		}
		this.user = user;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		//TODO: This code is messy/inefficient and needs to be improved
		List<GrantedAuthority> ga=new ArrayList<GrantedAuthority>();
		//ga.add(new SimpleGrantedAuthority("ROLE_"+this.user.getRoles().getRoleName().toUpperCase()));
		ga.add(new SimpleGrantedAuthority(this.user.getUserRole().getRoleName().toUpperCase()));
		this.user.getUserRole().getPermissions().forEach(permission->{
				ga.add(new SimpleGrantedAuthority(permission.getPermissionName().toUpperCase()));
			});
		ga.forEach(	a->System.out.println(a.getAuthority()));
		return ga;
	}

	@Override
	public String getPassword() {
		return this.user.getPassword();
	}

	@Override
	public String getUsername() {
		return this.user.getUserName();
	}

	@Override
	public boolean isAccountNonExpired() {
		//TODO: Check for expired
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		//TODO: Check for account not being locked
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		//TODO: Check credential non expired
		return true;
	}

	@Override
	public boolean isEnabled() {
		//TODO: Check for account being enabled
		return true;
	}
	public User getUserDetails() {
		return user;
	}

}
