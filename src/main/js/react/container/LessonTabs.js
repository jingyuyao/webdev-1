import React from "react";
import {matchPath} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import lessonService from "../service/LessonService";
import LessonTab from "./LessonTab";
import {joinPath} from "../util";

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

class LessonTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lessonMatch: null,
      newLessonTitle: "",
      lessons: [],
      selectedIndex: false
    };

    this.refreshLessons = this.refreshLessons.bind(this);
    this.selectActiveTab = this.selectActiveTab.bind(this);
    this.createNewLesson = this.createNewLesson.bind(this);
    this.newLessonTitleChanged = this.newLessonTitleChanged.bind(this);
    this.removeLesson = this.removeLesson.bind(this);
    this.tabChanged = this.tabChanged.bind(this);
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      lessonMatch: matchPath(nextProps.location.pathname, {
        path: `${nextProps.match.path}/:lessonId`
      })
    };
  }

  componentDidMount() {
    this.refreshLessons();
  }

  componentDidUpdate(prevProps) {
    const prevParams = prevProps.match.params;
    const currParams = this.props.match.params;
    if (currParams.moduleId !== prevParams.moduleId) {
      this.refreshLessons();
    } else {
      this.selectActiveTab();
    }
  }

  refreshLessons() {
    lessonService
      .findAllByModuleId(this.props.match.params.moduleId)
      .then(lessons => this.setState({lessons: lessons}))
      .then(this.selectActiveTab);
  }

  selectActiveTab() {
    const currLessonId =
      this.state.lessonMatch && this.state.lessonMatch.params.lessonId;
    const currLessonIndex = this.state.lessons.findIndex(lesson =>
      String(lesson.id) === currLessonId);
    const selectIndex = currLessonIndex !== -1 && currLessonIndex;
    if (selectIndex !== this.state.selectedIndex) {
      this.setState({selectedIndex: selectIndex});
    }
  }

  createNewLesson(event) {
    event.preventDefault();

    const lesson = {
      title: this.state.newLessonTitle,
      module: {
        id: this.props.match.params.moduleId
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
        this.props.history.replace(this.props.match.url);
        this.refreshLessons();
      });
  }

  tabChanged(event, index) {
    const match = this.props.match;
    const lesson = this.state.lessons[index];
    const lessonLink = joinPath(match.url, `/${lesson.id}`);
    this.props.history.push(lessonLink);
    this.setState({selectedIndex: index});
  }

  render() {
    const classes = this.props.classes;
    const lessons = this.state.lessons;
    const selectedIndex = this.state.selectedIndex;
    const selectedLesson = lessons[selectedIndex];
    const lessonTabs = lessons.map(lesson =>
      <Tab key={lesson.id} label={lesson.title}/>
    );
    const selectedTab = selectedLesson && (
      <LessonTab
        lesson={selectedLesson}
        removeLesson={this.removeLesson}/>
    );

    return (
      <Paper className={classes.root}>
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
        <Tabs scrollable value={selectedIndex} onChange={this.tabChanged}>
          {lessonTabs}
        </Tabs>
        {selectedTab}
      </Paper>
    );
  }
}

export default withStyles(styles)(LessonTabs);
