import React from "react";

class CourseRow extends React.Component {
  render() {
    const course = this.props.course;
    return (
      <tr>
        <td>{course.title}</td>
        <td>{course.created}</td>
        <td>{course.modified}</td>
        <td>X</td>
      </tr>
    );
  }
}

export default CourseRow;
