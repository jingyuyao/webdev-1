class WidgetService {
  constructor() {
    this._baseUrl = "/api/widget";
  }

  create(lessonId, widget) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(widget)
    };
    return fetch(`/api/lesson/${lessonId}/widget`, options)
      .then(response => response.json());
  }

  findAll() {
    return fetch(this._baseUrl).then(response => response.json());
  }

  findById(id) {
    return fetch(this._baseUrl + "/" + id).then(response => response.json());
  }

  findAllByLessonId(id) {
    return fetch("/api/lesson/" + id + "/widgets").then(response => response.json());
  }

  update(id, widget) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(widget)
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

export default new WidgetService();
