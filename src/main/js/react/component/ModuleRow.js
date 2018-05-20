import React from "react";
import {withRouter} from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

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
    const active = String(this.props.module.id) === this.props.match.params.optModuleId;
    return (
      <MenuItem selected={active} onClick={this.navigate}>
        <ListItemText>
          {this.props.module.title}
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton onClick={this.remove}>
            <DeleteIcon/>
          </IconButton>
        </ListItemSecondaryAction>
      </MenuItem>
    );
  }
}

export default withRouter(ModuleRow);
