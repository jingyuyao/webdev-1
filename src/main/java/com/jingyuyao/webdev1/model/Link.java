package com.jingyuyao.webdev1.model;

import javax.persistence.Entity;

@Entity
public class Link extends Widget {

  private String href;

  public String getHref() {
    return href;
  }

  public void setHref(String href) {
    this.href = href;
  }
}
