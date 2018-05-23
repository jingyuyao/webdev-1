package com.jingyuyao.webdev1.service;

import com.jingyuyao.webdev1.model.Widget;
import com.jingyuyao.webdev1.repository.LessonRepository;
import com.jingyuyao.webdev1.repository.WidgetRepository;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WidgetService {

  private final WidgetRepository widgetRepository;
  private final LessonRepository lessonRepository;

  @Autowired
  WidgetService(WidgetRepository widgetRepository, LessonRepository lessonRepository) {
    this.widgetRepository = widgetRepository;
    this.lessonRepository = lessonRepository;
  }

  @PostMapping("/api/widget")
  public Widget create(@RequestBody Widget widget) {
    return widgetRepository.save(widget);
  }

  @GetMapping("/api/widget")
  public Widgets findAll() {
    return new Widgets(widgetRepository.findAll());
  }

  @GetMapping("/api/widget/{id}")
  public Widget findById(@PathVariable int id) {
    return widgetRepository.findById(id).orElseThrow(() -> new NotFoundException("Widget", id));
  }

  @GetMapping("/api/lesson/{lessonId}/widgets")
  public Widgets findAllByLessonId(@PathVariable int lessonId) {
    return
        new Widgets(
            lessonRepository
                .findById(lessonId)
                .orElseThrow(() -> new NotFoundException("Lesson", lessonId))
                .getWidgets());
  }

  @PutMapping("/api/widget/{id}")
  public Widget update(@PathVariable int id, @RequestBody Widget widget) {
    Widget saved =
        widgetRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("Widget", id));

    saved.update(widget);

    return widgetRepository.save(saved);
  }

  @DeleteMapping("/api/widget/{id}")
  public void delete(@PathVariable int id) {
    if (widgetRepository.existsById(id)) {
      widgetRepository.deleteById(id);
    } else {
      throw new NotFoundException("Lesson", id);
    }
  }

  /**
   * Used to save type information so Jackson will serialize type info for generic types.
   *
   * @see <a href="https://github.com/FasterXML/jackson-databind/issues/336">
   * https://github.com/FasterXML/jackson-databind/issues/336</a>
   */
  private class Widgets {

    private final ArrayList<Widget> widgets;

    private Widgets(Iterable<Widget> widgets) {
      this.widgets = new ArrayList<>();
      // Defensive copy is used to mitigate type erasure.
      // Interesting enough, simply lesson.getWidgets() does not have enough type information.
      //
      widgets.forEach(this.widgets::add);
    }

    public Iterable<Widget> getWidgets() {
      return widgets;
    }
  }
}
