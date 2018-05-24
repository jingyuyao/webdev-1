import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import WidgetList from "./WidgetList";

class LessonTab extends React.Component {
  constructor(props) {
    super(props);

    this.removeLesson = this.removeLesson.bind(this);
  }

  removeLesson() {
    this.props.removeLesson(this.props.lesson.id);
  }

  render() {
    const lesson = this.props.lesson;

    return (
      <React.Fragment>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Typography variant="title">{lesson.title}</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={this.removeLesson}>
              <DeleteIcon/>
            </IconButton>
          </Grid>
        </Grid>
        <WidgetList lessonId={lesson.id}/>
      </React.Fragment>
    );
  }
}

export default LessonTab;
