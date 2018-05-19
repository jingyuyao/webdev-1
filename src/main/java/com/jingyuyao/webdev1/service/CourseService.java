package com.jingyuyao.webdev1.service;

import com.jingyuyao.webdev1.model.Course;
import com.jingyuyao.webdev1.model.Module;
import com.jingyuyao.webdev1.repository.CourseRepository;
import java.time.Instant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CourseService {

  private final CourseRepository courseRepository;

  @Autowired
  CourseService(CourseRepository courseRepository) {
    this.courseRepository = courseRepository;
  }

  @PostMapping("/api/course")
  public Course create(@RequestBody Course course) {
    Instant now = Instant.now();
    course.setCreated(now);
    course.setModified(now);
    return courseRepository.save(course);
  }

  @GetMapping("/api/course")
  public Iterable<Course> findAll() {
    return courseRepository.findAll();
  }

  @GetMapping("/api/course/{id}")
  public Course findById(@PathVariable int id) {
    return courseRepository.findById(id).orElseThrow(() -> new NotFoundException("Course", id));
  }

  @GetMapping("/api/course/{id}/modules")
  public Iterable<Module> findModulesById(@PathVariable int id) {
    return
        courseRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("Course", id))
            .getModules();
  }

  @PutMapping("/api/course/{id}")
  public Course update(@PathVariable int id, @RequestBody Course updatedCourse) {
    Course saved =
        courseRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("Course", id));

    saved.setTitle(updatedCourse.getTitle());
    saved.setModified(Instant.now());

    return courseRepository.save(saved);
  }

  @DeleteMapping("/api/course/{id}")
  public void delete(@PathVariable int id) {
    if (courseRepository.existsById(id)) {
      courseRepository.deleteById(id);
    } else {
      throw new NotFoundException("Course", id);
    }
  }
}
