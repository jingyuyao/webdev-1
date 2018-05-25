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
  }
});

class Widget extends React.Component {
  constructor(props) {
    super(props);

    this.remove = this.remove.bind(this);
  }

  remove() {
    this.props.removeWidget(this.props.widget.id);
  }

  renderTypeSpecificFields() {
    const widget = this.props.widget;
    switch (widget.type) {
      case "Heading":
        return (
          <FormControl fullWidth>
            <InputLabel htmlFor={`size-${widget.position}`}>
              Size
            </InputLabel>
            <Select
              value={widget.size}
              inputProps={{
                id: `size-${widget.position}`
              }}>
              <MenuItem value={1}>Heading 1</MenuItem>
              <MenuItem value={2}>Heading 2</MenuItem>
              <MenuItem value={3}>Heading 3</MenuItem>
            </Select>
          </FormControl>
        );
      case "Image":
        return (
          <TextField label="Source" fullWidth/>
        );
      case "Link":
        return (
          <TextField label="Hyperlink" fullWidth/>
        );
      case "List":
        return (
          <FormControl fullWidth>
            <InputLabel htmlFor={`list-type-${widget.position}`}>
              List type
            </InputLabel>
            <Select
              value={widget.listType}
              inputProps={{
                id: `list-type-${widget.position}`
              }}>
              <MenuItem value="UNORDERED">Unordered list</MenuItem>
              <MenuItem value="ORDERED">Ordered list</MenuItem>
            </Select>
          </FormControl>
        );
      default:
        return null;
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
          <FormControl>
            <InputLabel htmlFor={`widget-type-${widget.position}`}>
              Widget type
            </InputLabel>
            <Select
              value={widget.type}
              inputProps={{
                id: `widget-type-${widget.position}`
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
        <TextField label="Widget name" fullWidth/>
        <TextField label="Widget text" fullWidth/>
        {this.renderTypeSpecificFields()}
      </div>
    );
  }
}

export default withStyles(styles)(Widget);
