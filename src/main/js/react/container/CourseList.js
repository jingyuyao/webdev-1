import React from "react";
import CourseRow from "../component/CourseRow";
import courseService from "../service/CourseService";

class CourseList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: []
    };

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

  removeCourse(id) {
    courseService
      .remove(id)
      .then(() => this.refreshCourses());
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
        <h2>Course list</h2>
        <table>
          <thead>
            <th>Title</th>
            <th>Created</th>
            <th>Modified</th>
            <th>Actions</th>
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
