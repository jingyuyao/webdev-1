import React from "react";
import {NavLink} from "react-router-dom";

class LessonTab extends React.Component {
  constructor(props) {
    super(props);

    this.remove = this.remove.bind(this);
  }

  remove() {
    this.props.removeLesson(this.props.lesson.id);
  }

  render() {
    const courseId = this.props.courseId;
    const moduleId = this.props.moduleId;
    const lesson = this.props.lesson;
    const lessonLink = `/course/${courseId}/${moduleId}/${lesson.id}`;
    return (
      <tr>
        <td>
          <NavLink to={lessonLink}>{lesson.title}</NavLink>
        </td>
        <td>
          <button onClick={this.remove}>Remove</button>
        </td>
      </tr>
    );
  }
}

export default LessonTab;
