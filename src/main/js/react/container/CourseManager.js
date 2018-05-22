import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import CourseList from "./CourseList";
import CourseEditor from "./CourseEditor";

class CourseManager extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline/>
        <Router basename="/react/app">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/course"/>}/>
            <Route exact path="/course" component={CourseList}/>
            <Route path="/course/:courseId" component={CourseEditor}/>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default CourseManager;
