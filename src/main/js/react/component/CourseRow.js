import React from "react";

class CourseRow extends React.Component {
  constructor(props) {
    super(props);

    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
  }

  edit() {

  }

  remove() {
    this.props.removeCourse(this.props.course.id);
  }

  render() {
    const course = this.props.course;
    return (
      <tr>
        <td>{course.title}</td>
        <td>{course.created}</td>
        <td>{course.modified}</td>
        <td>
          <button onClick={this.edit}>Edit</button>
          <button onClick={this.remove}>Remove</button>
        </td>
      </tr>
    );
  }
}

export default CourseRow;
