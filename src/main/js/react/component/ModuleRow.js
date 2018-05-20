import React from "react";
import {NavLink} from "react-router-dom";

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
    const moduleLink = `/course/${courseId}/${module.id}`;
    return (
      <tr>
        <td>
          <NavLink to={moduleLink}>{module.title}</NavLink>
        </td>
        <td>
          <button onClick={this.remove}>Remove</button>
        </td>
      </tr>
    );
  }
}

export default ModuleRow;
