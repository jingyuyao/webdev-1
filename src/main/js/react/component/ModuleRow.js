import React from "react";
import {Link} from "react-router-dom";

class ModuleRow extends React.Component {
  constructor(props) {
    super(props);

    this.remove = this.remove.bind(this);
  }

  remove() {
    this.props.removeModule(this.props.module.id);
  }

  render() {
    const courseId = this.props.courseId;
    const module = this.props.module;
    const moduleLink = `/course/${courseId}/module/${module.id}`;
    return (
      <tr>
        <td>
          <Link to={moduleLink}>{module.title}</Link>
        </td>
        <td>
          <button onClick={this.remove}>Remove</button>
        </td>
      </tr>
    );
  }
}

export default ModuleRow;
