package com.jingyuyao.webdev1.service;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
class ExistsException extends RuntimeException {

  ExistsException(String type) {
    super(type + " already exists");
  }
}
