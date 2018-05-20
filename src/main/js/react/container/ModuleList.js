import React from "react";
import ModuleRow from "../component/ModuleRow";
import moduleService from "../service/ModuleService";

class ModuleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newModuleTitle: "",
      modules: []
    };

    this.refreshModules = this.refreshModules.bind(this);
    this.createNewModule = this.createNewModule.bind(this);
    this.newModuleTitleChanged = this.newModuleTitleChanged.bind(this);
    this.removeModule = this.removeModule.bind(this);
  }

  componentDidMount() {
    this.refreshModules();
  }

  refreshModules() {
    moduleService
      .findAllByCourseId(this.props.courseId)
      .then(modules => this.setState({modules: modules}));
  }

  createNewModule(event) {
    event.preventDefault();

    const module = {
      title: this.state.newModuleTitle,
      course: {
        id: this.props.courseId
      }
    };
    this.setState({newModuleTitle: ""});

    moduleService
      .create(module)
      .then(this.refreshModules);
  }

  newModuleTitleChanged(event) {
    this.setState({newModuleTitle: event.target.value});
  }

  removeModule(id) {
    moduleService
      .remove(id)
      .then(this.refreshModules);
  }

  render() {
    const moduleRows = this.state.modules.map(module =>
      <ModuleRow
        key={module.id}
        courseId={this.props.courseId}
        module={module}
        removeModule={this.removeModule}/>
    );

    return (
      <div>
        <h3>Modules</h3>
        <form onSubmit={this.createNewModule}>
          <label>
            Title
            <input
              type="text"
              value={this.state.newModuleTitle}
              onChange={this.newModuleTitleChanged}/>
          </label>
          <button type="submit">Submit</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Module</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {moduleRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ModuleList;
