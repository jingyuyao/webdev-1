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
  const payload = action.payload;

  switch(action.type) {
    case WidgetsActionTypes.WIDGETS_RESET: {
      return initialState;
    }
    case WidgetsActionTypes.WIDGETS_REFRESH: {
      return Object.assign({}, initialState, {
        active: payload
      });
    }
    case WidgetsActionTypes.WIDGETS_ADD: {
      return Object.assign({}, state, {
        nextTempId: state.nextTempId - 1,
        toAdd: [
          ...state.toAdd,
          Object.assign({}, payload, {
            id: state.nextTempId
          })
        ]
      });
    }
    case WidgetsActionTypes.WIDGETS_DELETE: {
      const notMatchPayload = widget => widget.id !== payload.id;
      const shiftSuccessorsDown =
        widget =>
          widget.position > payload.position
            ? Object.assign({}, widget, {
                position: widget.position - 1
              })
            : widget;
      const active =
        state.active.filter(notMatchPayload).map(shiftSuccessorsDown);
      const toAdd =
        state.toAdd.filter(notMatchPayload).map(shiftSuccessorsDown);
      const oldActiveWidget =
        state.active.find(widget => widget.id === payload.id);
      const toDelete =
        oldActiveWidget
          ? [...state.toDelete, payload]
          : state.toDelete;

      return Object.assign({}, state, {
        active: active,
        toAdd: toAdd,
        toDelete: toDelete
      });
    }
    case WidgetsActionTypes.WIDGETS_UPDATE: {
      const oldActiveWidget =
        state.active.find(widget => widget.id === payload.id);
      // Our service backend can't handle type changes. We need to
      // delete the old widget and create a new one with all of its
      // original properties if it already exists in the database.
      if (oldActiveWidget
            && oldActiveWidget.type !== payload.type) {
        return Object.assign({}, state, {
          active: state.active.filter(
            widget => widget.id !== payload.id),
          toDelete: [...state.toDelete, payload],
          toAdd: [...state.toAdd, payload]
        });
      }

      // Else we can just replace the widget in place.
      const replaceOldWidget =
        widget => widget.id === payload.id ? payload : widget;
      return Object.assign({}, state, {
        active: state.active.map(replaceOldWidget),
        toAdd: state.toAdd.map(replaceOldWidget)
      });
    }
    case WidgetsActionTypes.WIDGETS_SAVING: {
      return Object.assign({}, state, {
        saving: true
      });
    }
    case WidgetsActionTypes.WIDGETS_TOGGLE_PREVIEW: {
      return Object.assign({}, state, {
        preview: !state.preview
      });
    }
    default: {
      return state;
    }
  }
}

export default widgetsReducer;
