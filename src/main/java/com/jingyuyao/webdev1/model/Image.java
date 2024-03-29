package com.jingyuyao.webdev1.model;

import javax.persistence.Entity;

@Entity
public class Image extends Widget {

  private String src;

  public String getSrc() {
    return src;
  }

  public void setSrc(String src) {
    this.src = src;
  }

  @Override
  public <T extends Widget> void update(T widget) {
    super.update(widget);
    Image image = getClass().cast(widget);
    setSrc(image.getSrc());
  }
}
