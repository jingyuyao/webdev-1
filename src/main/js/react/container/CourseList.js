import React from "react";
import courseService from "../service/CourseService";

class CourseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
  }

  componentDidMount() {
    courseService.findAll().then(courses => this.setState({courses: courses}));
  }

  render() {
    const courseRows = this.state.courses.map(course =>
      <li key={course.id}>{course.title}</li>
    );

    return (
      <div>
        <h2>Course list</h2>
        <ul>
          {courseRows}
        </ul>
      </div>
    );
  }
}

export default CourseList;
