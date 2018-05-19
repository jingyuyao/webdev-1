package com.jingyuyao.webdev1.service;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReactService {

  @RequestMapping("/react/app/**")
  public String app() {
    return "/react/app.html";
  }

}
