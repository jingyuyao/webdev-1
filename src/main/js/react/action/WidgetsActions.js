export const WidgetsActionTypes = {
  WIDGETS_REFRESH: "WIDGETS_REFRESH",
  WIDGETS_ADD: "WIDGETS_ADD",
  WIDGETS_DELETE: "WIDGETS_DELETE",
  WIDGETS_UPDATE: "WIDGETS_UPDATE",
  WIDGETS_SAVING: "WIDGETS_SAVING",
  WIDGETS_TOGGLE_PREVIEW: "WIDGETS_TOGGLE_PREVIEW"
};

export function widgetsRefresh(widgets) {
  return {
    type: WidgetsActionTypes.WIDGETS_REFRESH,
    payload: widgets
  };
}

export function widgetsAdd(widget) {
  return {
    type: WidgetsActionTypes.WIDGETS_ADD,
    payload: widget
  };
}

export function widgetsDelete(widget) {
  return {
    type: WidgetsActionTypes.WIDGETS_DELETE,
    payload: widget
  };
}

export function widgetsUpdate(widget) {
  return {
    type: WidgetsActionTypes.WIDGETS_UPDATE,
    payload: widget
  };
}

export function widgetsSaving(widget) {
  return {
    type: WidgetsActionTypes.WIDGETS_SAVING
  };
}

export function widgetsTogglePreview() {
  return {
    type: WidgetsActionTypes.WIDGETS_TOGGLE_PREVIEW
  };
}
