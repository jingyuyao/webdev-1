import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MenuList from "@material-ui/core/MenuList";
import TextField from "@material-ui/core/TextField";
import ModuleRow from "../component/ModuleRow";
import moduleService from "../service/ModuleService";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing.unit
  },
  form: {
    alignItems: "flex-end",
    display: "flex",
  },
  titleInput: {
    flexGrow: 1,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

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

  componentDidUpdate(prevProps) {
    const prevParams = prevProps.match.params;
    const currParams = this.props.match.params;
    if (currParams.courseId !== prevParams.courseId) {
      this.refreshModules();
    }
  }

  refreshModules() {
    moduleService
      .findAllByCourseId(this.props.match.params.courseId)
      .then(modules => this.setState({modules: modules}));
  }

  createNewModule(event) {
    event.preventDefault();

    const module = {
      title: this.state.newModuleTitle
    };
    this.setState({newModuleTitle: ""});

    moduleService
      .create(this.props.match.params.courseId, module)
      .then(this.refreshModules);
  }

  newModuleTitleChanged(event) {
    this.setState({newModuleTitle: event.target.value});
  }

  removeModule(id) {
    moduleService
      .remove(id)
      .then(() => {
        this.props.history.replace(this.props.match.url);
        this.refreshModules();
      });
  }

  render() {
    const classes = this.props.classes;
    const moduleRows = this.state.modules.map(module =>
      <ModuleRow
        key={module.id}
        module={module}
        removeModule={this.removeModule}/>
    );

    return (
      <div className={classes.root}>
        <form
          className={classes.form}
          onSubmit={this.createNewModule}>
          <TextField
            label="Title"
            className={classes.titleInput}
            value={this.state.newModuleTitle}
            onChange={this.newModuleTitleChanged}/>
          <Button type="submit" variant="raised" color="primary">
            New Module
          </Button>
        </form>
        <MenuList>
          {moduleRows}
        </MenuList>
      </div>
    );
  }
}

export default withStyles(styles)(ModuleList);
