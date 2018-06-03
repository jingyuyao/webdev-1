package com.jingyuyao.webdev1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

@Entity
public class Exam extends Widget {

  private int points;
  @JsonIgnore
  @OneToMany(mappedBy = "exam", cascade = CascadeType.REMOVE, orphanRemoval = true)
  private List<Question> questions = new ArrayList<>();

  public int getPoints() {
    return points;
  }

  public void setPoints(int points) {
    this.points = points;
  }

  public List<Question> getQuestions() {
    return questions;
  }

  @Override
  public <T extends Widget> void update(T widget) {
    super.update(widget);
    Exam exam = getClass().cast(widget);
    setPoints(exam.getPoints());
  }
}
