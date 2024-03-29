import React from "react";
import {withStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CourseRow from "../component/CourseRow";
import courseService from "../service/CourseService";

const styles = theme => ({
  courseList: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing.unit
  },
  titleInput: {
    marginRight: theme.spacing.unit
  },
  form: {
    display: "flex"
  },
  tableWrapper: {
    overflowX: "scroll",
    width: "100%"
  }
});

class CourseList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newCourseTitle: "",
      courses: []
    };

    this.refreshCourses = this.refreshCourses.bind(this);
    this.createNewCourse = this.createNewCourse.bind(this);
    this.newCourseTitleChanged = this.newCourseTitleChanged.bind(this);
    this.removeCourse = this.removeCourse.bind(this);
  }

  componentDidMount() {
    this.refreshCourses();
  }

  refreshCourses() {
    courseService
      .findAll()
      .then(courses => this.setState({courses: courses}));
  }

  createNewCourse(event) {
    event.preventDefault();

    const course = {
      title: this.state.newCourseTitle
    };
    this.setState({newCourseTitle: ""});

    courseService
      .create(course)
      .then(this.refreshCourses);
  }

  newCourseTitleChanged(event) {
    this.setState({newCourseTitle: event.target.value});
  }

  removeCourse(id) {
    courseService
      .remove(id)
      .then(this.refreshCourses);
  }

  render() {
    const classes = this.props.classes;
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Course List
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.courseList}>
          <form className={classes.form} onSubmit={this.createNewCourse}>
            <TextField
              label="Title"
              className={classes.titleInput}
              value={this.state.newCourseTitle}
              onChange={this.newCourseTitleChanged}/>
            <Button type="submit" variant="raised" color="primary">
              New Course
            </Button>
          </form>
          <div className={classes.tableWrapper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Modified</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.courses.map(course =>
                  <CourseRow
                    key={course.id}
                    course={course}
                    removeCourse={this.removeCourse}
                  />)}
              </TableBody>
            </Table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CourseList);
