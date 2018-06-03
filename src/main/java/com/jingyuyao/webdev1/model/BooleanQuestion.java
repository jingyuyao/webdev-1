package com.jingyuyao.webdev1.model;

import javax.persistence.Entity;

@Entity
public class BooleanQuestion extends Question {

  private boolean answer;

  public boolean isAnswer() {
    return answer;
  }

  public void setAnswer(boolean answer) {
    this.answer = answer;
  }

  @Override
  public <T extends Question> void update(T question) {
    super.update(question);
    BooleanQuestion booleanQuestion = getClass().cast(question);
    setAnswer(booleanQuestion.isAnswer());
  }
}
