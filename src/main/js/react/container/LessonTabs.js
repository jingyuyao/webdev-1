import React from "react";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import lessonService from "../service/LessonService";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  },
  paper: {
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

class LessonTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newLessonTitle: "",
      lessons: [],
      selectedIndex: 0
    };

    this.refreshLessons = this.refreshLessons.bind(this);
    this.createNewLesson = this.createNewLesson.bind(this);
    this.newLessonTitleChanged = this.newLessonTitleChanged.bind(this);
    this.removeLesson = this.removeLesson.bind(this);
    this.tabChanged = this.tabChanged.bind(this);
  }

  componentDidMount() {
    this.refreshLessons();
  }

  componentDidUpdate(prevProps) {
    if (this.props.optModuleId !== prevProps.optModuleId) {
      this.refreshLessons();
    }
  }

  refreshLessons() {
    if (this.props.optModuleId) {
      lessonService
        .findAllByModuleId(this.props.optModuleId)
        .then(lessons =>
          this.setState({lessons: lessons, selectedIndex: 0}));
    } else {
      this.setState({lessons: [], selectedIndex: 0});
    }
  }

  createNewLesson(event) {
    event.preventDefault();

    const lesson = {
      title: this.state.newLessonTitle,
      module: {
        id: this.props.optModuleId
      }
    };
    this.setState({newLessonTitle: ""});

    lessonService
      .create(lesson)
      .then(this.refreshLessons);
  }

  newLessonTitleChanged(event) {
    this.setState({newLessonTitle: event.target.value});
  }

  removeLesson(id) {
    lessonService
      .remove(id)
      .then(() => {
        const courseId = this.props.courseId;
        const moduleId = this.props.optModuleId;
        const moduleLink = `/course/${courseId}/${moduleId}`;
        this.props.history.push(moduleLink);
        this.refreshLessons();
      });
  }

  tabChanged(event, index) {
    const courseId = this.props.courseId;
    const moduleId = this.props.optModuleId;
    const lesson = this.state.lessons[index];
    const lessonLink = `/course/${courseId}/${moduleId}/${lesson.id}`;
    this.props.history.push(lessonLink);
    this.setState({selectedIndex: index});
  }

  render() {
    if (!this.props.optModuleId) {
      return null;
    }

    const classes = this.props.classes;
    const lessons = this.state.lessons;
    const selectedIndex = this.state.selectedIndex;
    const selectedLesson = lessons[selectedIndex];
    const lessonTabs = lessons.map(lesson =>
      <Tab key={lesson.id} label={lesson.title}/>
    );
    const selectedTab = selectedLesson ? (
      <Grid container direction="column">
        <Grid item>
          <Typography>
            Viewing lesson {selectedLesson.title}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={this.removeLesson.bind(this, selectedLesson.id)}>
            <DeleteIcon/>
          </IconButton>
        </Grid>
      </Grid>
    ) : null;

    return (
      <Grid item xs={8} className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container direction="column">
            <Grid item>
              <form
                className={classes.form}
                onSubmit={this.createNewLesson}>
                <TextField
                  label="Title"
                  className={classes.titleInput}
                  value={this.state.newLessonTitle}
                  onChange={this.newLessonTitleChanged}/>
                <Button type="submit" variant="raised" color="primary">
                  New Lesson
                </Button>
              </form>
            </Grid>
            <Grid item>
              <Tabs value={selectedIndex} onChange={this.tabChanged}>
                {lessonTabs}
              </Tabs>
            </Grid>
            <Grid item>
              {selectedTab}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(LessonTabs));
