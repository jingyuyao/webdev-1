package com.jingyuyao.webdev1.model;

import javax.persistence.Entity;

@Entity
public class Heading extends Widget {

  private int size;

  public int getSize() {
    return size;
  }

  public void setSize(int size) {
    this.size = size;
  }
}
