package com.jingyuyao.webdev1.repository;

import com.jingyuyao.webdev1.model.Question;
import org.springframework.data.repository.CrudRepository;

public interface QuestionRepository extends CrudRepository<Question, Integer> {

  Iterable<Question> findAllByExamId(int examId);
}
