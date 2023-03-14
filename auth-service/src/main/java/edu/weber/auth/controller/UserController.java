package edu.weber.auth.controller;

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
import org.springframework.security.access.AccessDeniedException;
//import org.springframework.security.core.userdetails.User;

/**
 * This class is a Spring MVC controller that handles HTTP requests related to user authorization
 * It has one endpoint at "/users/current", which returns the authenticated user's Principal object
 * RESTful web service controller
 * base URI path is /users
 */
@RestController
@RequestMapping("/auth")
public class UserController {

	@Autowired
	private UserService userService;

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
	public void createUser(@RequestBody edu.weber.auth.model.User user) throws AccessDeniedException {
		userService.create(user);
	}

	/**
	 * Creates a test user
	 *
	 * @throws AccessDeniedException if the OAuth2 access token does not have the required "server" scope
	 */

	@RequestMapping(value="/create_test", method = RequestMethod.POST)
	public String createTestUser() throws AccessDeniedException {

		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		String password = bCryptPasswordEncoder.encode("password");
		User test_user = new User(123, "Test", "N/A", password);
		userService.create(test_user);
		return "Test User created!\n";
	}
}
