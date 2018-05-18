package com.jingyuyao.webdev1.service;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
class NotFoundException extends RuntimeException {

  NotFoundException(String type, int id) {
    super(type + " id " + id + " does not exist");
  }
}
