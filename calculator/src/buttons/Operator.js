import React from "react";
import { Grid } from "semantic-ui-react";

function Operator(props) {
  let operatorStyle = { backgroundColor: "#FFA500" }
  if (props.i === props.style) {
    operatorStyle = { backgroundColor: "#D88C00"}
  }
  return (
    <Grid.Column 
    style={ operatorStyle } 
    onMouseDown={ props.onClick }> 
    {props.i}
    </Grid.Column>
  );
}

export default Operator;