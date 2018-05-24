import React from "react";
import {Route} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ModuleList from "./ModuleList";
import LessonTabs from "./LessonTabs";
import courseService from "../service/CourseService";

const styles = theme => ({
  title: {
    marginLeft: theme.spacing.unit
  },
  container: {
    padding: theme.spacing.unit
  }
});

class CourseEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: null
    };
  }

  componentDidMount() {
    this.refreshCourse();
  }

  componentDidUpdate(prevProps) {
    const prevParams = prevProps.match.params;
    const currParams = this.props.match.params;
    if (currParams.courseId !== prevParams.courseId) {
      this.refreshCourse();
    }
  }

  refreshCourse() {
    courseService
      .findById(this.props.match.params.courseId)
      .then(course => this.setState({course: course}));
  }

  render() {
    const classes = this.props.classes;
    const match = this.props.match;

    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Course Editor
            </Typography>
            <Typography
              className={classes.title}
              variant="subheading"
              color="inherit">
              {this.state.course && this.state.course.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container className={classes.container}>
          <Grid item xs={12} md={4}>
            <Route path={`${match.path}`} component={ModuleList}/>
          </Grid>
          <Grid item xs={12} md={8}>
            <Route path={`${match.path}/:moduleId`} component={LessonTabs}/>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CourseEditor);
