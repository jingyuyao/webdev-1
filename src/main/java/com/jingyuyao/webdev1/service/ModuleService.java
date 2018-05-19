package com.jingyuyao.webdev1.service;

import com.jingyuyao.webdev1.model.Module;
import com.jingyuyao.webdev1.repository.CourseRepository;
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
public class ModuleService {

  private final ModuleRepository moduleRepository;
  private final CourseRepository courseRepository;

  @Autowired
  ModuleService(ModuleRepository moduleRepository, CourseRepository courseRepository) {
    this.moduleRepository = moduleRepository;
    this.courseRepository = courseRepository;
  }

  @PostMapping("/api/module")
  public Module create(@RequestBody Module module) {
    return moduleRepository.save(module);
  }

  @GetMapping("/api/module")
  public Iterable<Module> findAll() {
    return moduleRepository.findAll();
  }

  @GetMapping("/api/module/{id}")
  public Module findById(@PathVariable int id) {
    return moduleRepository.findById(id).orElseThrow(() -> new NotFoundException("Module", id));
  }

  @GetMapping("/api/course/{id}/modules")
  public Iterable<Module> findModulesById(@PathVariable int id) {
    return
        courseRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("Course", id))
            .getModules();
  }

  @PutMapping("/api/module/{id}")
  public Module update(@PathVariable int id, @RequestBody Module updatedModule) {
    Module saved =
        moduleRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("Module", id));

    saved.setTitle(updatedModule.getTitle());

    return moduleRepository.save(saved);
  }

  @DeleteMapping("/api/module/{id}")
  public void delete(@PathVariable int id) {
    if (moduleRepository.existsById(id)) {
      moduleRepository.deleteById(id);
    } else {
      throw new NotFoundException("Module", id);
    }
  }
}
