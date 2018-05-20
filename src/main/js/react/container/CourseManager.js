import React from "react";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import CourseList from "./CourseList";
import CourseEditor from "./CourseEditor";

class CourseManager extends React.Component {
  render() {
    return (
      <Router basename="/react/app">
        <div>
          <Route exact path="/" render={() => <Redirect to="/courses"/>}/>
          <Route exact path="/courses" component={CourseList}/>
          <Route path="/course/:courseId/:moduleId?/:lessonId?" component={CourseEditor}/>
        </div>
      </Router>
    );
  }
}

export default CourseManager;
