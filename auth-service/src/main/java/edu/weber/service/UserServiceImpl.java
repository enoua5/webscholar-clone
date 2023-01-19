package edu.weber.auth.service;

import edu.weber.auth.model.User;
import edu.weber.auth.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
// TODO
@Service
public class UserServiceImpl implements UserService {

	private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

	@Autowired
	private UserRepository userRepository;

	@Override
	public void create(User user) {

		Optional<User> existing = userRepository.findById(user.getUserId());
		existing.ifPresent(it-> {throw new IllegalArgumentException("user already exists: " + it.getUserName());});

		String hash = encoder.encode(user.getPassword());
		user.setPassword(hash);

		userRepository.save(user);
	}

	@Override
	public void save(User user) {
		userRepository.save(user);
	}

	@Override
	@Transactional(propagation= Propagation.REQUIRES_NEW,rollbackFor=Exception.class)
	public Optional<User> update(int userId, User user) {
		return userRepository.findById(userId);
	}

	@Override
	public void delete(int userId) {
		userRepository.deleteById(userId);
	}

	@Override
	public List<User> getUsers() {
		List<User> allUsers = userRepository.findAll();
		return allUsers;
	}

	@Override
	public Optional<User> getUserById(int userId) {
		return userRepository.findById(userId);
	}

	@Override
	public User getUserByUserName(String userName) {
		return userRepository.findByUserName(userName);
	}
}
