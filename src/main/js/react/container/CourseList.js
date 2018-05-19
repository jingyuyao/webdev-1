import React from "react";
import CourseRow from "../component/CourseRow";
import courseService from "../service/CourseService";

class CourseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
  }

  componentDidMount() {
    courseService
      .findAll()
      .then(courses => this.setState({courses: courses}));
  }

  render() {
    const courseRows = this.state.courses.map(course =>
      <CourseRow key={course.id} course={course}/>
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
