import React from "react";
import CourseRow from "../component/CourseRow";
import courseService from "../service/CourseService";

class CourseList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newCourseTitle: "",
      courses: []
    };

    this.refreshCourses = this.refreshCourses.bind(this);
    this.createNewCourse = this.createNewCourse.bind(this);
    this.newCourseTitleChanged = this.newCourseTitleChanged.bind(this);
    this.removeCourse = this.removeCourse.bind(this);
  }

  componentDidMount() {
    this.refreshCourses();
  }

  refreshCourses() {
    courseService
      .findAll()
      .then(courses => this.setState({courses: courses}));
  }

  createNewCourse(event) {
    event.preventDefault();

    const course = {
      title: this.state.newCourseTitle
    };
    this.setState({newCourseTitle: ""});

    courseService
      .create(course)
      .then(this.refreshCourses);
  }

  newCourseTitleChanged(event) {
    this.setState({newCourseTitle: event.target.value});
  }

  removeCourse(id) {
    courseService
      .remove(id)
      .then(this.refreshCourses);
  }

  render() {
    const courseRows = this.state.courses.map(course =>
      <CourseRow
        key={course.id}
        course={course}
        removeCourse={this.removeCourse}
      />
    );

    return (
      <div>
        <h2>Course List</h2>
        <form onSubmit={this.createNewCourse}>
          <label>
            Title
            <input
              type="text"
              value={this.state.newCourseTitle}
              onChange={this.newCourseTitleChanged}/>
          </label>
          <button type="submit">Submit</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Created</th>
              <th>Modified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courseRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CourseList;
