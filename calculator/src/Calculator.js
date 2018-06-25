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
      answer: null,
      content: "0",
      number: null,
      placeholder: "", 
      operator: null
    }
  }

  // this.addEventListener('keypress', (event)=> { this.setState({ content: this.state.content + event.target.value }) });

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

  renderOperator(i) {
    let x = this.state
    return (
      <Grid.Column 
      className='operator' 
      onClick={ () => {
          this.setState({
            number: x.content,
            placeholder: x.content, 
            content: '',
            operator: {i} }) 
        } // function end
      }> 
      {i}
      </Grid.Column>
    );
  }

  renderEquals(i) {
    let x = this.state
    let result = 0
    return (
      <Grid.Column 
      className='operator' 
      onClick={ () => {
        if (x.operator.i === "-") {
          result = x.number - x.content
        } else if (x.operator.i === "+") {
          result = x.number + x.content
        } else if (x.operator.i === "%") {
          result = x.number / x.content
        } else {
          result = "there was no match in the if block"
        }

        this.setState({
          answer: result,
          content: result,
          number: result,
          placeholder: ''
        })
           
        } // function end
      }> 
      =
      </Grid.Column>
    );
  }

  renderInputBar() {
    return(
      <Input 
      placeholder={this.state.placeholder}
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
        <Grid columns={4} celled>
          <Grid.Row>
            {this.renderCell(1)}
            {this.renderCell(2)}
            {this.renderCell(3)}
            {this.renderOperator("-")}
          </Grid.Row>
          <Grid.Row>
            {this.renderCell(4)}
            {this.renderCell(5)}
            {this.renderCell(6)}
            {this.renderOperator("%")}
          </Grid.Row>
          <Grid.Row>
            {this.renderCell(7)}
            {this.renderCell(8)}
            {this.renderCell(9)}
            {this.renderOperator("+")}
          </Grid.Row>
          <Grid.Row>
            {this.renderEquals()}
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}


export default Calculator;