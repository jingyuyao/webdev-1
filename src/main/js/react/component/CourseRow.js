import React from "react";
import {Link, withRouter} from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

class CourseRow extends React.Component {
  constructor(props) {
    super(props);

    this.remove = this.remove.bind(this);
  }

  remove() {
    this.props.removeCourse(this.props.course.id);
  }

  render() {
    const match = this.props.match;
    const course = this.props.course;
    const courseLink = `${match.url}/${course.id}`;
    return (
      <TableRow>
        <TableCell>
          <Link to={courseLink}>{course.title}</Link>
        </TableCell>
        <TableCell>{course.created}</TableCell>
        <TableCell>{course.modified}</TableCell>
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
