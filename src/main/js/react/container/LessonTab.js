import React from "react";
import {withStyles} from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import WidgetList from "./WidgetList";

const styles = theme => ({
  header: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between"
  }
});

class LessonTab extends React.Component {
  constructor(props) {
    super(props);

    this.removeLesson = this.removeLesson.bind(this);
  }

  removeLesson() {
    this.props.removeLesson(this.props.lesson.id);
  }

  render() {
    const classes = this.props.classes;
    const lesson = this.props.lesson;

    return (
      <React.Fragment>
        <div className={classes.header}>
          <Typography variant="title">{lesson.title}</Typography>
          <IconButton onClick={this.removeLesson}>
            <DeleteIcon/>
          </IconButton>
        </div>
        <WidgetList lessonId={lesson.id}/>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(LessonTab);
