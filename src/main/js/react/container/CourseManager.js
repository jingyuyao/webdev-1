import React from "react";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import CourseList from "./CourseList";

class CourseManager extends React.Component {
  render() {
    return (
      <Router basename="/react/app.html">
        <div>
          <Route exact path="/" render={() => <Redirect to="/courses"/>}/>
          <Route path="/courses" component={CourseList}/>
        </div>
      </Router>
    );
  }
}

export default CourseManager;
