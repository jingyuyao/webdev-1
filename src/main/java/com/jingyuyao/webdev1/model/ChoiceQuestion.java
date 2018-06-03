package com.jingyuyao.webdev1.model;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;

@Entity
public class ChoiceQuestion extends Question {

  @ElementCollection
  private List<String> choices = new ArrayList<>();
  private int answer;

  public List<String> getChoices() {
    return choices;
  }

  public void setChoices(List<String> choices) {
    this.choices = choices;
  }

  public int getAnswer() {
    return answer;
  }

  public void setAnswer(int answer) {
    this.answer = answer;
  }

  @Override
  public <T extends Question> void update(T question) {
    super.update(question);
    ChoiceQuestion choiceQuestion = getClass().cast(question);
    setChoices(choiceQuestion.getChoices());
    setAnswer(choiceQuestion.getAnswer());
  }
}
