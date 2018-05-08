package com.jingyuyao.webdev1.repository;

import org.springframework.data.repository.CrudRepository;

import com.jingyuyao.webdev1.model.User;

public interface UserRepository extends CrudRepository<User, Integer> {

}
