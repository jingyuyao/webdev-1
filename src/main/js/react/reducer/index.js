import {combineReducers} from "redux";
import widgetsReducer from "./WidgetsReducer";

export default combineReducers({
  widgets: widgetsReducer
});
