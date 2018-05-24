import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./reducer";
import CourseManager from "./container/CourseManager";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <CourseManager/>
  </Provider>,
  document.getElementById("app-root")
);
