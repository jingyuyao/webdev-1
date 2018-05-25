import {WidgetsActionTypes} from "../action/WidgetsActions";

const initialState = {
  active: [],
  toAdd: [],
  toDelete: [],
  // Use negative IDs for yet to be created widgets
  nextTempId: -1,
  saving: false,
  preview: false
};

function widgetsReducer(state = initialState, action) {
  console.log(state);
  console.log(action);
  switch(action.type) {
    case WidgetsActionTypes.WIDGETS_RESET:
      return initialState;
    case WidgetsActionTypes.WIDGETS_REFRESH:
      return Object.assign({}, initialState, {
        active: action.payload
      });
    case WidgetsActionTypes.WIDGETS_ADD:
      const newWidget = Object.assign({}, action.payload, {
        id: state.nextTempId
      });
      return Object.assign({}, state, {
        nextTempId: state.nextTempId - 1,
        toAdd: [...state.toAdd, newWidget]
      });
    case WidgetsActionTypes.WIDGETS_DELETE:
      const deletedFromActive =
        state.active.find(w => w.id === action.payload);
      return Object.assign({}, state, {
        active: state.active.filter(w => w.id !== action.payload),
        toAdd: state.toAdd.filter(w => w.id !== action.payload),
        toDelete:
          deletedFromActive
            ? [...state.toDelete, action.payload]
            : state.toDelete
      });
    case WidgetsActionTypes.WIDGETS_UPDATE:
      return Object.assign({}, state, {
        active: state.active.map(
          w => w.id === action.payload.id ? action.payload : w),
        toAdd: state.toAdd.map(
          w => w.id === action.payload.id ? action.payload : w)
      });
    case WidgetsActionTypes.WIDGETS_SAVING:
      return Object.assign({}, state, {
        saving: true
      });
    case WidgetsActionTypes.WIDGETS_TOGGLE_PREVIEW:
      return Object.assign({}, state, {
        preview: !state.preview
      });
    default:
      return state;
  }
}

export default widgetsReducer;
