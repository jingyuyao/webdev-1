import React from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import * as WidgetsActions from "../action/WidgetsActions";
import widgetService from "../service/WidgetService";
import Widget from "../component/Widget";

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit
  },
  header: {
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-end"
  },
  footer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-end"
  }
});

function mapStateToProps(state) {
  const widgetsToDisplay = [
    ...state.widgets.active,
    ...state.widgets.toAdd
  ];
  widgetsToDisplay.sort((l, r) => l.position - r.position);

  return {
    widgets: state.widgets,
    widgetsToDisplay: widgetsToDisplay
  };
}

function mapDispatchToProps(dispatch) {
  return {
    widgetsReset:
      () => dispatch(WidgetsActions.widgetsReset()),
    widgetsRefresh:
      widgets => dispatch(WidgetsActions.widgetsRefresh(widgets)),
    widgetsAdd:
      widget => dispatch(WidgetsActions.widgetsAdd(widget)),
    widgetsDelete:
      widgetId => dispatch(WidgetsActions.widgetsDelete(widgetId)),
    widgetsUpdate:
      widget => dispatch(WidgetsActions.widgetsUpdate(widget)),
    widgetsSaving:
      () => dispatch(WidgetsActions.widgetsSaving()),
    widgetsTogglePreview:
      () => dispatch(WidgetsActions.widgetsTogglePreview())
  };
}

class WidgetList extends React.Component {
  constructor(props) {
    super(props);

    this.refreshWidgets = this.refreshWidgets.bind(this);
    this.addWidget = this.addWidget.bind(this);
    this.removeWidget = this.removeWidget.bind(this);
    this.updateWidget = this.updateWidget.bind(this);
    this.saveWidgets = this.saveWidgets.bind(this);
  }

  componentDidMount() {
    this.refreshWidgets();
  }

  componentDidUpdate(prevProps) {
    if (this.props.lessonId !== prevProps.lessonId) {
      this.refreshWidgets();
    }
  }

  refreshWidgets() {
    this.props.widgetsReset();
    widgetService
      .findAllByLessonId(this.props.lessonId)
      .then(response => this.props.widgetsRefresh(response.widgets));
  }

  addWidget() {
    const defaultWidget = {
      type: "Heading",
      position: this.props.widgetsToDisplay.length
    };
    this.props.widgetsAdd(defaultWidget);
  }

  removeWidget(widgetId) {
    this.props.widgetsDelete(widgetId);
  }

  updateWidget(widget) {
    this.props.widgetsUpdate(widget);
  }

  saveWidgets() {
    this.props.widgetsSaving();

    const toAddPromises =
      this.props.widgets.toAdd.map(
        widget => widgetService.create(this.props.lessonId, widget));
    const toDeletePromises =
      this.props.widgets.toDelete.map(widget => widgetService.remove(widget));
    const toUpdatePromises =
      this.props.widgets.active.map(widget => widgetService.update(widget.id, widget));
    const allPromises = [
      ...toAddPromises,
      ...toDeletePromises,
      ...toUpdatePromises
    ];
    Promise.all(allPromises).then(this.refreshWidgets);
  }

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <Button
            variant="raised" color="primary"
            disabled={this.props.widgets.saving}
            onClick={this.saveWidgets}>
            {this.props.widgets.saving ? "Saving" : "Save"}
          </Button>
        </div>
        {this.props.widgetsToDisplay.map(widget => (
          <Widget
            key={widget.id}
            widget={widget}
            removeWidget={this.removeWidget}
            updateWidget={this.updateWidget}/>))}
        <div className={classes.footer}>
          <IconButton onClick={this.addWidget}>
            <AddBoxIcon/>
          </IconButton>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(WidgetList));
