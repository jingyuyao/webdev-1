import React from "react";
import {Link} from "react-router-dom";

class CourseRow extends React.Component {
  constructor(props) {
    super(props);

    this.remove = this.remove.bind(this);
  }

  remove() {
    this.props.removeCourse(this.props.course.id);
  }

  render() {
    const course = this.props.course;
    const courseLink = `/course/${course.id}`;
    return (
      <tr>
        <td>
          <Link to={courseLink}>{course.title}</Link>
        </td>
        <td>{course.created}</td>
        <td>{course.modified}</td>
        <td>
          <button onClick={this.remove}>Remove</button>
        </td>
      </tr>
    );
  }
}

export default CourseRow;
