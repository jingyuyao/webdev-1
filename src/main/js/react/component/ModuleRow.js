import React from "react";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const styles = theme => ({
  menuItem: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& $primary, & $icon": {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {}
});

class ModuleRow extends React.Component {
  constructor(props) {
    super(props);

    this.navigate = this.navigate.bind(this);
    this.remove = this.remove.bind(this);
  }

  navigate() {
    const courseId = this.props.courseId;
    const module = this.props.module;
    const moduleLink = `/course/${courseId}/${module.id}`;
    this.props.history.push(moduleLink);
  }

  remove() {
    this.props.removeModule(this.props.module.id);
  }

  render() {
    const classes = this.props.classes;
    return (
      <MenuItem className={classes.menuItem} onClick={this.navigate}>
        <ListItemText className={classes.primary}>
          {this.props.module.title}
        </ListItemText>
        <ListItemSecondaryAction className={classes.icon}>
          <IconButton onClick={this.remove}>
            <DeleteIcon/>
          </IconButton>
        </ListItemSecondaryAction>
      </MenuItem>
    );
  }
}

export default withRouter(withStyles(styles)(ModuleRow));
