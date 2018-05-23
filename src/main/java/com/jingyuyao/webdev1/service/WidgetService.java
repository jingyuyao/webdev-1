package com.jingyuyao.webdev1.service;

import com.jingyuyao.webdev1.model.Widget;
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
public class WidgetService {

  private final WidgetRepository widgetRepository;

  @Autowired
  WidgetService(WidgetRepository widgetRepository) {
    this.widgetRepository = widgetRepository;
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
    return new Widgets(widgetRepository.findAllByLessonId(lessonId));
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

    private final Iterable<Widget> widgets;

    private Widgets(Iterable<Widget> widgets) {
      this.widgets = widgets;
    }

    public Iterable<Widget> getWidgets() {
      return widgets;
    }
  }
}
