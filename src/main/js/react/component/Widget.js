import React from "react";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    border: `1px solid ${theme.palette.grey[300]}`,
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  header: {
    alignItems: "center",
    display: "flex"
  },
  headerTitle: {
    flexGrow: 1
  }
});

class Widget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const classes = this.props.classes;
    const widget = this.props.widget;

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography variant="title" className={classes.headerTitle}>
            {widget.type} widget
          </Typography>
        </div>
        <TextField label="Widget name" fullWidth/>
        <TextField label="Widget text" fullWidth/>
      </div>
    );
  }
}

export default withStyles(styles)(Widget);
