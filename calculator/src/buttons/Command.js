import React from "react";
import { Grid } from "semantic-ui-react";

function Command(props) {
  let commandStyle = { backgroundColor: "#E1E1E1" }
  if (props.i === props.style) {
    commandStyle = { backgroundColor: "#D1D1D1"}
  }
  return (
    <Grid.Column
    width={ props.width }
    style={ commandStyle } 
    onMouseDown={ props.onClick }> 
    {props.i}
    </Grid.Column>
  );
}
export default Command;