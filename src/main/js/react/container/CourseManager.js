import React from "react";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import CourseList from "./CourseList";
import CourseEditor from "./CourseEditor";

class CourseManager extends React.Component {
  render() {
    return (
      <Router basename="/react/app">
        <React.Fragment>
          <CssBaseline/>
          <Route exact path="/" render={() => <Redirect to="/course"/>}/>
          <Route exact path="/course" component={CourseList}/>
          <Route path="/course/:courseId" component={CourseEditor}/>
        </React.Fragment>
      </Router>
    );
  }
}

export default CourseManager;
