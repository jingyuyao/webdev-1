import React from "react";
import {withStyles} from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
  },
  widgetTypeControl: {
    minWidth: 100
  }
});

class Widget extends React.Component {
  constructor(props) {
    super(props);

    this.remove = this.remove.bind(this);
    this.handleWidgetChange = this.handleWidgetChange.bind(this);
  }

  remove() {
    this.props.removeWidget(this.props.widget);
  }

  handleWidgetChange(event) {
    this.props.updateWidget(Object.assign({}, this.props.widget, {
      [event.target.name]: event.target.value
    }));
  }

  renderTypeSpecificFields() {
    const widget = this.props.widget;
    switch (widget.type) {
      case "Heading": {
        return (
          <FormControl fullWidth>
            <InputLabel htmlFor={`size-${widget.id}`}>
              Size
            </InputLabel>
            <Select
              value={widget.size ? widget.size : 1}
              inputProps={{
                id: `size-${widget.id}`,
                name: "size"
              }}
              onChange={this.handleWidgetChange}>
              <MenuItem value={1}>Heading 1</MenuItem>
              <MenuItem value={2}>Heading 2</MenuItem>
              <MenuItem value={3}>Heading 3</MenuItem>
            </Select>
          </FormControl>
        );
      }
      case "Image": {
        return (
        <TextField
          fullWidth label="Source"
          value={widget.src ? widget.src : ""}
          inputProps={{name: "src"}}
          onChange={this.handleWidgetChange}/>
        );
      }
      case "Link": {
        return (
        <TextField
          fullWidth label="Hyperlink"
          value={widget.href ? widget.href : ""}
          inputProps={{name: "href"}}
          onChange={this.handleWidgetChange}/>
        );
      }
      case "List": {
        return (
          <FormControl fullWidth>
            <InputLabel htmlFor={`list-type-${widget.id}`}>
              List type
            </InputLabel>
            <Select
              value={widget.listType ? widget.listType : "UNORDERED"}
              inputProps={{
                id: `list-type-${widget.id}`,
                name: "listType"
              }}
              onChange={this.handleWidgetChange}>
              <MenuItem value="UNORDERED">Unordered list</MenuItem>
              <MenuItem value="ORDERED">Ordered list</MenuItem>
            </Select>
          </FormControl>
        );
      }
      default: {
        return null;
      }
    }
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
          <FormControl className={classes.widgetTypeControl}>
            <InputLabel htmlFor={`widget-type-${widget.id}`}>
              Widget type
            </InputLabel>
            <Select
              value={widget.type}
              onChange={this.handleWidgetChange}
              inputProps={{
                id: `widget-type-${widget.id}`,
                name: "type"
              }}>
              <MenuItem value="Heading">Heading</MenuItem>
              <MenuItem value="Paragraph">Paragraph</MenuItem>
              <MenuItem value="Image">Image</MenuItem>
              <MenuItem value="Link">Link</MenuItem>
              <MenuItem value="List">List</MenuItem>
            </Select>
          </FormControl>
          <IconButton onClick={this.remove}>
            <DeleteIcon/>
          </IconButton>
        </div>
        <TextField
          fullWidth label="Widget name"
          value={widget.name ? widget.name : ""}
          inputProps={{name: "name"}}
          onChange={this.handleWidgetChange}/>
        <TextField
          fullWidth label="Widget text"
          value={widget.text ? widget.text : ""}
          inputProps={{name: "text"}}
          onChange={this.handleWidgetChange}/>
        {this.renderTypeSpecificFields()}
      </div>
    );
  }
}

export default withStyles(styles)(Widget);
