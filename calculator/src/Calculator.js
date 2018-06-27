import React, { Component } from 'react';
import { Input, Container, Grid } from 'semantic-ui-react';
import './index.css';

class Calculator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: "",
      number: null,
      placeholder: "", 
      operator: '',
      equalsTriggered: 0,
      backupContent: null
    }
  }

  updateInput(key) {
    let x = this.state
    let content = x.content 
    let operators = ['-','/','*','+'] 
    
    if ( parseInt(key) || key === "0") {
      console.log("handleCellClick for " + key)
      this.handleCellClick(key)

    } else if ( operators.includes(key) ) {
      console.log("handleOperatorClick for" +key)
      this.handleOperatorClick(key)

    } else if ( key === "Enter" || key === "=" ) {
      console.log("rendering equals")
      this.handleEqualsClick(key)

    } else if ( key === "Backspace") { // cant yet get the "delete" key triggering from eventlistener
      console.log("rendering delete command")
      this.handleDeleteClick(key)
    } else if ( key === "c") { // cant yet get the "delete" key triggering from eventlistener
      console.log("rendering AC command")
      this.handleCommandClick("AC")
    } else {
      console.log( key +" is not an operator or a number")
    }
  }

// needs work. does pop() work on a string?
  handleDeleteClick(i) {
    let content = this.state.content
    content = content.slice(0,-1)
    this.setState({ content: content })
  }

  handleCellClick(i) {
    this.setState({content: this.state.content + i })
  }

  renderCell(i, width) {
    return (
      <Grid.Column 
      width={width}
      className='cell' 
      onClick={ () => this.handleCellClick(i) }
      >
      {i}
      </Grid.Column>
    );
  }

  handleOperatorClick(i) {
    let x = this.state
    this.setState({
      number: x.content,
      placeholder: x.content, 
      content: '',
      operator: {i},
      equalsTriggered: 0,
      backupContent: null }) 
  }

  renderOperator(i) {
    return (
      <Grid.Column 
      className='operator' 
      onClick={ () => { this.handleOperatorClick(i) } 
      }> 
      {i}
      </Grid.Column>
    );
  }

  handleCommandClick(i) { 
    let x = this.state
    let result = ""
    if (i === "+/-") {
      result = x.content * -1
    } else if (i === "%") {
      result = x.content / 100
    } 
      this.setState({
        number: result,
        placeholder: result,
        content: result,
        operator: '',
        equalsTriggered: 0,
        backupContent: null }) 
    }

  renderCommand(i,width) {
    return (
      <Grid.Column
      width={width}
      className='command' 
      onClick={ () => {this.handleCommandClick(i)}}> 
      {i}
      </Grid.Column>
    );
  }

  handleEqualsClick(i) {
    let x = this.state
    let result = ""
    let operator = x.operator.i
    let number = x.number
    let content = x.content
    let backupContent = x.backupContent
    if (x.equalsTriggered === 0) {
      backupContent = content
     // if equals has been pushed only ONCE before, then backupcontent state is set to last content , else content is use backedContent.
    } else if (x.equalsTriggered >= 1) {
      content = backupContent
    }
    if (operator === "-") {
      result = number - content
    } else if (operator === "+") {
      result = (parseFloat(number) + parseFloat(content))
    } else if (operator === "/") {
      result = number / content
    } else if (operator === "x") {
      result = number * content
    } else {
      result = x.content
    }
    result = result.toString();
    this.setState({
      content: result,
      number: result,
      placeholder: "",
      equalsTriggered: (x.equalsTriggered + 1),
      backupContent: backupContent
    })
  }

  renderEquals(i) {
    return (
      <Grid.Column 
      className='equals' 
      onClick={ () => { this.handleEqualsClick(i) } // function end
      }> 
      =
      </Grid.Column>
    );
  } // renderEquals end. 

  renderInputBar() {
    return(
      <Input 
      fluid
      // disabled
      className="input-bar"
      placeholder={this.state.placeholder}
      value={this.state.content}
      onChange={(event) => this.setState({ content: event.target.value })}
      />
    );
  }

  componentDidMount() {
   window.addEventListener('keydown', (event) => {this.updateInput(event.key)} ) 
  } // did mount end

  componentWillUnmount() {
    window.addEventListener('keydown', (event) => {this.updateInput(event.key)} )
  }

  render() {
    return(
      <Container className="container">
        {this.renderInputBar()}
        <Grid 
        columns={4} 
        celled 
        textAlign='center' 
        className="all-buttons">
          <Grid.Row>
            {this.renderCommand("AC", 4)}
            {this.renderCommand("+/-", 4)}
            {this.renderCommand("%", 4)}
            {this.renderOperator("x", 4)}
          </Grid.Row>
          <Grid.Row>
            {this.renderCell(7, 4)}
            {this.renderCell(8, 4)}
            {this.renderCell(9, 4)}
            {this.renderOperator("/", 4)}
          </Grid.Row>
          <Grid.Row>
            {this.renderCell(4, 4)}
            {this.renderCell(5, 4)}
            {this.renderCell(6, 4)}
            {this.renderOperator("+", 4)}
          </Grid.Row>
          <Grid.Row>
            {this.renderCell(1, 4)}
            {this.renderCell(2, 4)}
            {this.renderCell(3, 4)}
            {this.renderOperator("-", 4)}
          </Grid.Row>
          <Grid.Row>
            {this.renderCell(0, 8)}
            {this.renderCell(".", 4)}
            {this.renderEquals()}
          </Grid.Row>
        </Grid>
      </Container> 
    );
  }
}


export default Calculator;