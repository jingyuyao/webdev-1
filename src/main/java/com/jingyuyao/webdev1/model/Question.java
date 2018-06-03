package com.jingyuyao.webdev1.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    property = "type"
)
@JsonSubTypes({

})
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Question {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @JsonProperty(access = Access.READ_ONLY)
  private int id;
  private String title;
  @Lob
  private String text;
  private int points;
  @JsonProperty(access = Access.WRITE_ONLY)
  @ManyToOne(optional = false, fetch = FetchType.LAZY)
  private Exam exam;

  public int getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public int getPoints() {
    return points;
  }

  public void setPoints(int points) {
    this.points = points;
  }

  public Exam getExam() {
    return exam;
  }

  public <T extends Question> void update(T question) {
    if (!getClass().equals(question.getClass())) {
      throw new IllegalArgumentException("Can only update from object of the same class");
    }
    setTitle(question.getTitle());
    setText(question.getText());
    setPoints(question.getPoints());
  }
}
