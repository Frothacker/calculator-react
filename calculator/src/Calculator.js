import React, { Component } from 'react';
import './index.css';
import { Input, Container, Grid } from 'semantic-ui-react';


function Cell(props) {
  return(
    <Grid.Column className='cell' onClick={ () => {console.log(props.value)} }>
      {props.value}
    </Grid.Column>
  );
}

class Calculator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: ""
    }
  }

  renderCell(i) {
    return (
      <Grid.Column 
      className='cell' 
      onClick={ () => this.setState({content: this.state.content + i }) }
      >
      {i}
      </Grid.Column>
    );
  }

  renderInputBar() {
    return(
      <Input 
      placeholder="numbers"
      value={this.state.content}
      fluid 
      onChange={(event) => this.setState({ content: event.target.value })}
      />
    );
  }

  render() {
    return(
      <Container text className="container">
        {this.renderInputBar()}
        <Grid columns={3} celled>
          <Grid.Row>
            {this.renderCell(1)}
            {this.renderCell(2)}
            {this.renderCell(3)}
          </Grid.Row>
          <Grid.Row>
            {this.renderCell(4)}
            {this.renderCell(5)}
            {this.renderCell(6)}
          </Grid.Row>
          <Grid.Row>
            {this.renderCell(7)}
            {this.renderCell(8)}
            {this.renderCell(9)}
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}


export default Calculator;