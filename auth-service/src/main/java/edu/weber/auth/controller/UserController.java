package edu.weber.auth.controller;

import edu.weber.auth.model.Permission;
import edu.weber.auth.model.Role;
import edu.weber.auth.service.UserService;
import edu.weber.auth.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;
import java.util.HashSet;

import org.springframework.security.access.AccessDeniedException;

/**
 * This class is a Spring MVC controller that handles HTTP requests related to user authorization
 * It has an endpoint at "/auth/current", which returns the authenticated user's Principal object
 * It has a POST mapping which creates a new User in the system
 * It has endpoints to create a test User, currently does not assign it a role
 * RESTful web service controller
 * base URI path is /auth
 */
@RestController
@RequestMapping("/auth")
public class UserController {

	@Autowired
	private UserService userService;

	/**
	 * Placeholder role for testing
	 * This is probably not where we want to do this but for now
	 * it allows us to create a Role and assign a User to it
	 */
	private static Role testRole;

	/**
	 * Constructor just so we can initialize our testing role
	 * Testing Role has empty Set of Permissions for now
	 */
	public UserController() {
		testRole = new Role("test role", new HashSet<Permission>());
	}

	/**
	 * This method returns the authenticated user's Principal object.
	 *
	 * @param principal the authenticated user's Principal object
	 * @return the authenticated user's Principal object
	 */
	@RequestMapping(value = "/current", method = RequestMethod.GET)
	public Principal getUser(Principal principal) {
		return principal;
	}

	/**
	 * This method creates a new user in the system.
	 * edu.weber.auth.model.User is clarified because there are multiple User types
	 *
	 * @param user the user to create
	 * @throws AccessDeniedException if the OAuth2 access token does not have the required "server" scope
	 */
	@RequestMapping(method = RequestMethod.POST)
	public void createUser(@RequestBody User user) throws AccessDeniedException {
		userService.create(user);
	}

	/**
	 * Creates a test User with a test Role
	 *
	 * @throws AccessDeniedException if the OAuth2 access token does not have the required "server" scope
	 */
	@RequestMapping(value="/create_test", method = RequestMethod.POST)
	public String createTestUser() throws AccessDeniedException {

		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		String password = bCryptPasswordEncoder.encode("password");
		User test_user = new User("Test", "N/A", password);
		test_user.setUserRole(testRole);	// Here we set the User's Role. Running this multiple times creates duplicate Roles. Will have to fix.
		userService.create(test_user);
		return "Test User created!\n";
	}
}
