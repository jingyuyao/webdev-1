package com.jingyuyao.webdev1.service;

import com.jingyuyao.webdev1.model.Exam;
import com.jingyuyao.webdev1.model.Question;
import com.jingyuyao.webdev1.model.Widget;
import com.jingyuyao.webdev1.repository.QuestionRepository;
import com.jingyuyao.webdev1.repository.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class QuestionService {

  private final QuestionRepository questionRepository;
  private final WidgetRepository widgetRepository;

  @Autowired
  QuestionService(QuestionRepository questionRepository, WidgetRepository widgetRepository) {
    this.questionRepository = questionRepository;
    this.widgetRepository = widgetRepository;
  }

  @PostMapping("/api/widget/{examId}/question")
  public Question create(@PathVariable int examId, @RequestBody Question question) {
    Widget widget =
        widgetRepository
            .findById(examId)
            .orElseThrow(() -> new NotFoundException("Exam", examId));
    if (!Exam.class.isInstance(widget)) {
      throw new NotFoundException("Exam", examId);
    }
    Exam exam = Exam.class.cast(widget);
    question.setExam(exam);
    return questionRepository.save(question);
  }

  @GetMapping("/api/question")
  public Questions findAll() {
    return new Questions(questionRepository.findAll());
  }

  @GetMapping("/api/question/{id}")
  public Question findById(@PathVariable int id) {
    return questionRepository.findById(id).orElseThrow(() -> new NotFoundException("Question", id));
  }

  @GetMapping("/api/widget/{examId}/questions")
  public Questions findAllByLessonId(@PathVariable int examId) {
    return new Questions(questionRepository.findAllByExamId(examId));
  }

  @PutMapping("/api/question/{id}")
  public Question update(@PathVariable int id, @RequestBody Question question) {
    Question saved =
        questionRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("Question", id));

    saved.update(question);

    return questionRepository.save(saved);
  }

  @DeleteMapping("/api/question/{id}")
  public void delete(@PathVariable int id) {
    if (questionRepository.existsById(id)) {
      questionRepository.deleteById(id);
    } else {
      throw new NotFoundException("Question", id);
    }
  }

  /**
   * Used to save type information so Jackson will serialize type info for generic types.
   *
   * @see <a href="https://github.com/FasterXML/jackson-databind/issues/336">
   * https://github.com/FasterXML/jackson-databind/issues/336</a>
   */
  private class Questions {

    private final Iterable<Question> questions;

    private Questions(Iterable<Question> questions) {
      this.questions = questions;
    }

    public Iterable<Question> getQuestions() {
      return questions;
    }
  }
}
