package com.jingyuyao.webdev1.service;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
class UnauthorizedException extends RuntimeException {

  UnauthorizedException(String msg) {
    super(msg);
  }
}
