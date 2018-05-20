import React from "react";
import ModuleList from "./ModuleList";
import LessonTabs from "./LessonTabs";
import courseService from "../service/CourseService";

class CourseEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: null
    };
  }

  componentDidMount() {
    this.refreshCourse();
  }

  componentDidUpdate(prevProps) {
    const prevParams = prevProps.match.params;
    const currParams = this.props.match.params;
    if (currParams.courseId !== prevParams.courseId) {
      this.refreshCourse();
    }
  }

  refreshCourse() {
    courseService
      .findById(this.props.match.params.courseId)
      .then(course => this.setState({course: course}));
  }

  render() {
    const courseId = this.props.match.params.courseId;
    const optModuleId = this.props.match.params.optModuleId;
    const optLessonId = this.props.match.params.optLessonId;
    const course = this.state.course;
    const courseHeader = course ? <h3>{course.title}</h3> : null;

    return (
      <div>
        <h2>Course Editor</h2>
        {courseHeader}
        <div>
          <ModuleList courseId={courseId}/>
          <LessonTabs
            courseId={courseId}
            optModuleId={optModuleId}
            optLessonId={optLessonId}/>
        </div>
      </div>
    );
  }
}

export default CourseEditor;
