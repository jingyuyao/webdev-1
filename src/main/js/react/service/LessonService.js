class LessonService {
  constructor() {
    this._baseUrl = "/api/lesson";
  }

  create(lesson) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(lesson)
    };
    return fetch(this._baseUrl, options).then(response => response.json());
  }

  findAll() {
    return fetch(this._baseUrl).then(response => response.json());
  }

  findById(id) {
    return fetch(this._baseUrl + "/" + id).then(response => response.json());
  }

  findByModuleId(id) {
    return fetch("/api/module/" + id + "/lessons").then(response => response.json());
  }

  update(id, lesson) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(lesson)
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

export default new LessonService();
