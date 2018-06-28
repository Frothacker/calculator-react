import React from 'react';
import { Grid } from 'semantic-ui-react';

function Equals(props) {
  let equalsStyle = { backgroundColor: "#FFA500" }
  if ("=" === props.style) {
    equalsStyle = { backgroundColor: "#D88C00"}
  }
  return (
    <Grid.Column 
    style={ equalsStyle } 
    onMouseDown={props.onClick}> 
    =
    </Grid.Column>
  );
} 

export default Equals;