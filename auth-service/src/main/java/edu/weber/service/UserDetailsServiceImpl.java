package edu.weber.auth.service;

import edu.weber.auth.model.User;
import edu.weber.auth.model.UserDetailsImpl;
import edu.weber.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
// TODO
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;

	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		System.out.println("inside user details Service");
		User user = userRepository.findByUserName(username);
		if(user == null) {
			throw new UsernameNotFoundException(username+" not found");
		}
		
		return new UserDetailsImpl(user);
	}

}
