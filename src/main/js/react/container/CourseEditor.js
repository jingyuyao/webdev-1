import React from "react";
import courseService from "../service/CourseService";

class CourseEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: null
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    courseService
      .findById(id)
      .then(course => this.setState({course: course}));
  }

  render() {
    const course = this.state.course;
    const body = course === null ? null : (
      <ul>
        <li>{course.title}</li>
      </ul>
    );

    return (
      <div>
        <h2>Course Editor</h2>
        {body}
      </div>
    );
  }
}

export default CourseEditor;
