import React from "react";
import moduleService from "../service/ModuleService";

class ModuleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modules: []
    };
  }

  componentDidMount() {
    moduleService
      .findAllByCourseId(this.props.courseId)
      .then(modules => this.setState({modules: modules}));
  }

  render() {
    const moduleRows = this.state.modules.map(module =>
      <li key={module.id}>{module.title}</li>
    );

    return (
      <div>
        <h3>Modules</h3>
        <ul>
          {moduleRows}
        </ul>
      </div>
    );
  }
}

export default ModuleList;
