package edu.weber.auth.controller;

import edu.weber.auth.model.User;
import edu.weber.auth.model.UserDetailsImpl;
import edu.weber.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
// TODO
@RestController
@RequestMapping("/v1")
public class UserResourceController {

	@Autowired
	private UserService userService;

	@PostMapping(value="/users")
	public ResponseEntity<String> saveuser(@RequestBody User user ) {
		userService.save(user);
		return new ResponseEntity<String>(HttpStatus.CREATED);
		
	}
	@PutMapping(value="/users/{userId}", consumes=MediaType.APPLICATION_JSON_VALUE, produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> updateuser(@RequestBody User user ,@PathVariable ("userId") int userId) {
		
		User s = userService.update(userId,user).get();
		HttpHeaders headers=new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		return new ResponseEntity<User>(s,headers,HttpStatus.ACCEPTED);
		
	}
	
	@DeleteMapping(value="/users/{userId}")
	public ResponseEntity<User> deleteuser(@PathVariable ("userId") int userId) {
		
		userService.delete(userId);
		
		return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
		
	}
	
	@GetMapping(value="/users", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<User>> getAllusers() {
		
		return new ResponseEntity<List<User>>(userService.getUsers(), HttpStatus.FOUND);
		
	}
	
	@GetMapping(value="/users/{userId}")
	public User getuserById(@PathVariable ("userId") int userId) {
		
		User user=userService.getUserById(userId).get();
		if(user==null) {
			System.out.println("User not found");
			return null;
		}
		return user;
	}
	
	@GetMapping(value="/users/search/me",produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> getuserByIds() {
		
		UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		User user = userService.getUserByUserName( userDetails.getUsername());
			
		if(user==null) {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<User>(user,HttpStatus.OK);
	}
	
	@GetMapping(value="/users/search/{userName}")
	public ResponseEntity<User> getuserByUserName(@PathVariable ("userName") String userName) {
		
		User user=userService.getUserByUserName(userName);
		if(user == null) {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<User>(user,HttpStatus.OK);
	}
	
	
	
	
}
