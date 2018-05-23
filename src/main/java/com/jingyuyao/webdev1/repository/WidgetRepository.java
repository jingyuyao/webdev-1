package com.jingyuyao.webdev1.repository;

import com.jingyuyao.webdev1.model.Widget;
import org.springframework.data.repository.CrudRepository;

public interface WidgetRepository extends CrudRepository<Widget, Integer> {

  Iterable<Widget> findAllByLessonId(int lessonId);
}
