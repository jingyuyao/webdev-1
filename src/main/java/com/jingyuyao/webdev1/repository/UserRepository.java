package com.jingyuyao.webdev1.repository;

import com.jingyuyao.webdev1.model.User;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

  Optional<User> findByUsername(String username);

}
