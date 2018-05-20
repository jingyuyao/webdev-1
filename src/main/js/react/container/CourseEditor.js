import React from "react";
import ModuleList from "./ModuleList";
import courseService from "../service/CourseService";

class CourseEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: null
    };
  }

  componentDidMount() {
    const courseId = this.props.match.params.courseId;
    courseService
      .findById(courseId)
      .then(course => this.setState({course: course}));
  }

  render() {
    const courseId = this.props.match.params.courseId;
    const course = this.state.course;

    return (
      <div>
        <h2>Course Editor</h2>
        <h3>{course ? course.title : null}</h3>
        <div>
          <ModuleList courseId={courseId}/>
        </div>
      </div>
    );
  }
}

export default CourseEditor;
