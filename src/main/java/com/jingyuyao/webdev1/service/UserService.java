package com.jingyuyao.webdev1.service;

import com.jingyuyao.webdev1.model.User;
import com.jingyuyao.webdev1.repository.UserRepository;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserService {

  private static final String USER_SESSION_ATTRIBUTE = "user";

  private final UserRepository userRepository;

  @Autowired
  UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @PostMapping("/api/register")
  public User register(@RequestBody User user, HttpSession session) {
    if (userRepository.findByUsername(user.getUsername()).isPresent()) {
      throw new ExistsException("User");
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
        .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));
    // Sets the saved version so it will have an ID.
    session.setAttribute(USER_SESSION_ATTRIBUTE, saved);
    return saved;
  }

  @PostMapping("/api/logout")
  public void logout(HttpSession session) {
    session.removeAttribute(USER_SESSION_ATTRIBUTE);
  }

  @GetMapping("/api/profile")
  public User profile(HttpSession session) {
    User user = (User) session.getAttribute(USER_SESSION_ATTRIBUTE);
    if (user == null) {
      throw new UnauthorizedException("Not logged in");
    }
    return user;
  }

  @PutMapping("/api/profile")
  public User updateProfile(@RequestBody User updatedUser, HttpSession session) {
    User sessionUser = (User) session.getAttribute(USER_SESSION_ATTRIBUTE);
    if (sessionUser == null
        || updatedUser.getUsername() == null
        || !updatedUser.getUsername().equals(sessionUser.getUsername())) {
      throw new UnauthorizedException("Cannot modify profile");
    }
    updateUser(sessionUser, updatedUser);
    User saved = userRepository.save(sessionUser);
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
    return userRepository.findById(id).orElseThrow(() -> new NotFoundException("User", id));
  }

  @PutMapping("/api/user/{id}")
  public User update(@PathVariable int id, @RequestBody User updatedUser) {
    User saved = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User", id));

    updateUser(saved, updatedUser);

    return userRepository.save(saved);
  }

  @DeleteMapping("/api/user/{id}")
  public void delete(@PathVariable int id) {
    if (userRepository.existsById(id)) {
      userRepository.deleteById(id);
    } else {
      throw new NotFoundException("User", id);
    }
  }

  /**
   * @param oldUser must have an ID.
   * @param updatedUser the new user object to pull data from.
   */
  private void updateUser(User oldUser, User updatedUser) {
    oldUser.setUsername(updatedUser.getUsername());
    oldUser.setPassword(updatedUser.getPassword());
    oldUser.setFirstName(updatedUser.getFirstName());
    oldUser.setLastName(updatedUser.getLastName());
    oldUser.setPhone(updatedUser.getPhone());
    oldUser.setEmail(updatedUser.getEmail());
    oldUser.setRole(updatedUser.getRole());
    oldUser.setDateOfBirth(updatedUser.getDateOfBirth());
  }
}
