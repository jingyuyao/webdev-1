package com.jingyuyao.webdev1.model;

import java.util.HashMap;
import java.util.Map;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;

@Entity
public class FillInQuestion extends Question {

  @ElementCollection
  private Map<String, String> answers = new HashMap<>();

  public Map<String, String> getAnswers() {
    return answers;
  }

  public void setAnswers(Map<String, String> answers) {
    this.answers = answers;
  }

  @Override
  public <T extends Question> void update(T question) {
    super.update(question);
    FillInQuestion fillInQuestion = getClass().cast(question);
    setAnswers(fillInQuestion.getAnswers());
  }
}
