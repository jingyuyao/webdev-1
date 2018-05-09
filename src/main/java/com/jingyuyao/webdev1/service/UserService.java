package com.jingyuyao.webdev1.service;

import com.jingyuyao.webdev1.model.User;
import com.jingyuyao.webdev1.repository.UserRepository;
import javax.servlet.http.HttpSession;
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

@RestController
public class UserService {

  private static final String USER_SESSION_ATTRIBUTE = "user";

  @Autowired
  private UserRepository userRepository;

  @PostMapping("/api/register")
  public User register(@RequestBody User user, HttpSession session) {
    if (userRepository.findByUsername(user.getUsername()).isPresent()) {
      throw new UserExistsException();
    }

    User saved = userRepository.save(user);
    // Sets the saved version so it will have an ID.
    session.setAttribute(USER_SESSION_ATTRIBUTE, saved);
    return saved;
  }

  @PostMapping("/api/login")
  public User login(@RequestBody User user, HttpSession session) {
    User saved = userRepository
        .findByUsernameAndPassword(user.getUsername(), user.getPassword())
        .orElseThrow(InvalidCredentials::new);
    session.setAttribute(USER_SESSION_ATTRIBUTE, saved);
    return saved;
  }

  @PostMapping("/api/user")
  public User create(@RequestBody User user) {
    return userRepository.save(user);
  }

  @GetMapping("/api/user")
  public Iterable<User> findAll() {
    return userRepository.findAll();
  }

  @GetMapping("/api/user/{id}")
  public User findById(@PathVariable int id) {
    return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
  }

  @PutMapping("/api/user/{id}")
  public User update(@PathVariable int id, @RequestBody User updated) {
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
  public void delete(@PathVariable int id) {
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

  @ResponseStatus(HttpStatus.FORBIDDEN)
  private class UserExistsException extends RuntimeException {

    private UserExistsException() {
      super("User already exists");
    }
  }

  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  private class InvalidCredentials extends RuntimeException {

    private InvalidCredentials() {
      super("Invalid credentials");
    }
  }
}
