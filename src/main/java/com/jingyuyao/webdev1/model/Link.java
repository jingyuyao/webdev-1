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

  @Override
  public <T extends Widget> void update(T widget) {
    super.update(widget);
    Link link = getClass().cast(widget);
    setHref(link.getHref());
  }
}
