package com.jingyuyao.webdev1.service;

import com.jingyuyao.webdev1.model.Lesson;
import com.jingyuyao.webdev1.model.Module;
import com.jingyuyao.webdev1.repository.LessonRepository;
import com.jingyuyao.webdev1.repository.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LessonService {

  private final LessonRepository lessonRepository;
  private final ModuleRepository moduleRepository;

  @Autowired
  LessonService(LessonRepository lessonRepository, ModuleRepository moduleRepository) {
    this.lessonRepository = lessonRepository;
    this.moduleRepository = moduleRepository;
  }

  @PostMapping("/api/module/{moduleId}/lesson")
  public Lesson create(@PathVariable int moduleId, @RequestBody Lesson lesson) {
    Module module =
        moduleRepository
            .findById(moduleId)
            .orElseThrow(() -> new NotFoundException("Module", moduleId));
    lesson.setModule(module);
    return lessonRepository.save(lesson);
  }

  @GetMapping("/api/lesson")
  public Iterable<Lesson> findAll() {
    return lessonRepository.findAll();
  }

  @GetMapping("/api/lesson/{id}")
  public Lesson findById(@PathVariable int id) {
    return lessonRepository.findById(id).orElseThrow(() -> new NotFoundException("Lesson", id));
  }

  @GetMapping("/api/module/{moduleId}/lessons")
  public Iterable<Lesson> findAllByModuleId(@PathVariable int moduleId) {
    return lessonRepository.findAllByModuleId(moduleId);
  }

  @PutMapping("/api/lesson/{id}")
  public Lesson update(@PathVariable int id, @RequestBody Lesson updatedLesson) {
    Lesson saved =
        lessonRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("Lesson", id));

    saved.setTitle(updatedLesson.getTitle());

    return lessonRepository.save(saved);
  }

  @DeleteMapping("/api/lesson/{id}")
  public void delete(@PathVariable int id) {
    if (lessonRepository.existsById(id)) {
      lessonRepository.deleteById(id);
    } else {
      throw new NotFoundException("Lesson", id);
    }
  }
}
