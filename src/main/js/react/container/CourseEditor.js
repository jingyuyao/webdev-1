import React from "react";
import ModuleList from "./ModuleList";

class CourseEditor extends React.Component {
  render() {
    const courseId = this.props.match.params.courseId;
    return (
      <div>
        <h2>Course Editor</h2>
        <div>
          <ModuleList courseId={courseId}/>
        </div>
      </div>
    );
  }
}

export default CourseEditor;
