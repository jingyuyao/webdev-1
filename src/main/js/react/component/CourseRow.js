import React from "react";
import {withRouter} from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {joinPath} from "../util";

class CourseRow extends React.Component {
  constructor(props) {
    super(props);

    this.navigate = this.navigate.bind(this);
    this.remove = this.remove.bind(this);
  }

  navigate() {
    const match = this.props.match;
    const course = this.props.course;
    const courseLink = joinPath(match.url, `/${course.id}`);
    this.props.history.push(courseLink);
  }

  remove() {
    this.props.removeCourse(this.props.course.id);
  }

  render() {
    const course = this.props.course;
    return (
      <TableRow hover>
        <TableCell onClick={this.navigate}>{course.title}</TableCell>
        <TableCell onClick={this.navigate}>{course.created}</TableCell>
        <TableCell onClick={this.navigate}>{course.modified}</TableCell>
        <TableCell>
          <IconButton onClick={this.remove}>
            <DeleteIcon/>
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}

export default withRouter(CourseRow);
