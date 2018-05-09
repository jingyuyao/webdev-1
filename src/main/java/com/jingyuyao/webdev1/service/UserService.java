package com.jingyuyao.webdev1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.jingyuyao.webdev1.model.User;
import com.jingyuyao.webdev1.repository.UserRepository;

@RestController
public class UserService {
	@Autowired
	private UserRepository userRepository;

	@PostMapping("/api/user")
	public User createUser(@RequestBody User user) {
		return userRepository.save(user);
	}

	@GetMapping("/api/user")
	public Iterable<User> findAllUsers() {
		return userRepository.findAll();
	}

	@GetMapping("/api/user/{id}")
	public User findUserById(@PathVariable int id) {
		return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
	}

	@PutMapping("/api/user/{id}")
	public User updateUser(@PathVariable int id, @RequestBody User updated) {
		User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));

		user.setUsername(updated.getUsername());
		user.setPassword(updated.getPassword());
		user.setFirstName(updated.getFirstName());
		user.setLastName(updated.getLastName());
		user.setPhone(updated.getPhone());
		user.setEmail(updated.getEmail());
		user.setRole(updated.getRole());
		user.setDateOfBirth(updated.getDateOfBirth());

		return userRepository.save(user);
	}

	@DeleteMapping("/api/user/{id}")
	public void deleteUser(@PathVariable int id) {
		if (userRepository.existsById(id)) {
			userRepository.deleteById(id);
		} else {
			throw new UserNotFoundException(id);
		}
	}

	@ResponseStatus(HttpStatus.NOT_FOUND)
	private class UserNotFoundException extends RuntimeException {
		private static final long serialVersionUID = 9186091192329568418L;

		private UserNotFoundException(int id) {
			super("User id " + id + " does not exist");
		}
	}
}
