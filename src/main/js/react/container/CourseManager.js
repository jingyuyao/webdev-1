import React from "react";
import courseService from "../service/CourseService";

class CourseManager extends React.Component {
  componentWillMount() {
    courseService.findAll(courses => console.log(courses));
  }

  render() {
    return <h1>Hello world!</h1>;
  }
}

export default CourseManager;
