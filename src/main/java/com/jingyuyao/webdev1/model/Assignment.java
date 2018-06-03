package com.jingyuyao.webdev1.model;

import javax.persistence.Entity;

@Entity
public class Assignment extends Widget {

  private String title;
  private int points;

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public int getPoints() {
    return points;
  }

  public void setPoints(int points) {
    this.points = points;
  }

  @Override
  public <T extends Widget> void update(T widget) {
    super.update(widget);
    Assignment assignment = getClass().cast(widget);
    setTitle(assignment.getTitle());
    setPoints(assignment.getPoints());
  }
}
