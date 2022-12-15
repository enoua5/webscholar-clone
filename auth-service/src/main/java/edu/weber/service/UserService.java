package edu.weber.auth.service;

import edu.weber.auth.model.User;

import java.util.List;
import java.util.Optional;
// TODO
public interface UserService {

	void create(User user);
	void save(User user);
	Optional<User> update(int userId, User user);
	void delete(int userId);

	List<User> getUsers();

	Optional<User> getUserById(int userId);

	User getUserByUserName(String userName);
}
