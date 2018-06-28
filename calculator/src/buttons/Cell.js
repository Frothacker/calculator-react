import React from 'react';
import { Grid } from 'semantic-ui-react';

function Cell(props) {
  let cellStyle = {backgroundColor: "#FCFCFC"}
  if ( props.i === props.style ) {
    cellStyle = {backgroundColor: "#E1E1E1"}
  }
  return (
    <Grid.Column 
    width={ props.width }
    style={ cellStyle }
    onMouseDown={ props.onClick } 
    >
    {props.i}
    </Grid.Column>
  );
}
export default Cell;