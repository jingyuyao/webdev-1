package com.jingyuyao.webdev1.model;

import javax.persistence.Entity;

@Entity
public class List extends Widget {

  private ListType listType;

  public ListType getListType() {
    return listType;
  }

  public void setListType(ListType listType) {
    this.listType = listType;
  }

  public enum ListType {
    ORDERED,
    UNORDERED,
  }
}
