import React from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class LessonTab extends React.Component {
  constructor(props) {
    super(props);

    this.remove = this.remove.bind(this);
  }

  remove() {
    this.props.removeLesson(this.props.lesson.id);
  }

  render() {
    const lesson = this.props.lesson;
    return (
      <Grid container direction="column">
        <Grid item>
          <Typography>
            Viewing lesson {lesson.title}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={this.remove}>
            <DeleteIcon/>
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

export default LessonTab;
