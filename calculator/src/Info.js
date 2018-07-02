import React from 'react';
import { Card } from 'semantic-ui-react';

function Info() {
  return(
  
    <Card fluid>
      <Card.Content>
        <Card.Header>This calculator loves your keybaord! </Card.Header>
        <Card.Meta>Try using:</Card.Meta>
        <Card.Description>
            All the numbers 0 to 9, as well as '+' and '-' Use 'X' and '/' for multiply and divide <br />
            <br /> 'Enter' and 'Delete' work like you expect. You can use '%' to form a percentage, and '.' for a decimal point.
        </Card.Description>
      </Card.Content>
    </Card>
  
  );
}

export default Info;