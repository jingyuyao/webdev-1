import React from "react";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import ModuleRow from "../component/ModuleRow";
import moduleService from "../service/ModuleService";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
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
    if (this.props.courseId !== prevProps.courseId) {
      this.refreshModules();
    }
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
      .then(() => {
        // Go back to general course page if the current module is deleted
        if (String(id) === this.props.optModuleId) {
          const courseLink = `/course/${this.props.courseId}`;
          this.props.history.push(courseLink);
        }

        this.refreshModules();
      });
  }

  render() {
    const classes = this.props.classes;
    const moduleRows = this.state.modules.map(module =>
      <ModuleRow
        key={module.id}
        courseId={this.props.courseId}
        module={module}
        removeModule={this.removeModule}/>
    );

    return (
      <Grid item xs={3} className={classes.root}>
        <Grid container direction="column">
          <Grid item>
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
          </Grid>
          <List>
            {moduleRows}
          </List>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(ModuleList));
