import React from "react";
import {withRouter, matchPath} from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {joinPath} from "../util";

class ModuleRow extends React.Component {
  constructor(props) {
    super(props);

    this.navigate = this.navigate.bind(this);
    this.remove = this.remove.bind(this);
  }

  navigate() {
    const match = this.props.match;
    const module = this.props.module;
    const moduleLink = joinPath(match.url, `/${module.id}`);
    this.props.history.push(moduleLink);
  }

  remove() {
    this.props.removeModule(this.props.module.id);
  }

  render() {
    const match = this.props.match;
    const moduleMatch = matchPath(this.props.location.pathname, {
      path: `${match.path}/:moduleId`
    });
    const active =
      moduleMatch && String(this.props.module.id) === moduleMatch.params.moduleId;
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
