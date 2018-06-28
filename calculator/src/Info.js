import React from 'react';
import { Segment } from 'semantic-ui-react';

function Info() {
  return(
    <Segment.Group>
      <Segment>This calculator works with your keybaord! </Segment>
      <Segment.Group raised >
        <Segment> all the numbers ( 0 to 9 ), as well as + and - </Segment> 
        <Segment> use X and / for multiply and divide </Segment> 
        <Segment> 'Enter' and 'Delete' work like you expect</Segment>
        <Segment> % to make a percentage, and '.' for a point</Segment>
      </Segment.Group>
    </Segment.Group>
  );
}

export default Info;