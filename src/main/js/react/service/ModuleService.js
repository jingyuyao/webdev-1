class ModuleService {
  constructor() {
    this._baseUrl = "/api/module";
  }

  create(courseId, module) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(module)
    };
    return fetch(`/api/course/${courseId}/module`, options)
      .then(response => response.json());
  }

  findAll() {
    return fetch(this._baseUrl).then(response => response.json());
  }

  findById(id) {
    return fetch(this._baseUrl + "/" + id).then(response => response.json());
  }

  findAllByCourseId(id) {
    return fetch("/api/course/" + id + "/modules").then(response => response.json());
  }

  update(id, module) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(module)
    };
    return fetch(this._baseUrl + "/" + id, options).then(response => response.json());
  }

  remove(id) {
    const options = {
      method: "DELETE"
    };
    return fetch(this._baseUrl + "/" + id, options);
  }
}

export default new ModuleService();
