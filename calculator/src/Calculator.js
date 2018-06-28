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
      backupContent: null,
      pressStyle: ''
    }
  }

  updateInput(key) {
    let operators = ['-','/','*','+'] 
    
    if ( parseInt(key) || key === "0") {  // if key is a number, handle click as integar. 
      this.handleCellClick(parseInt(key)) 
    } else if ( operators.includes(key) ) { // handles case of other operators key input
      this.handleOperatorClick(key)
    } else if ( key === "%" ) { // handles case of "%" key input
      this.handleCommandClick("%")
    } else if ( key === "*" ) { // handles case of "*" key input
      this.handleOperatorClick("x")
    } else if ( key === "Enter" || key === "=" ) { // handles case of "=" and "enter" key inputs
      this.handleEqualsClick(key)
    } else if ( key === "Backspace") { // handle backspace input
      this.handleDeleteClick(key)
    } else if ( key === "c") { // handles clear input. 
      this.handleCommandClick("AC")
    } else {
      console.log( key +" is not an operator or a number")
    }
  }

  handleDeleteClick(i) {
    let content = this.state.content
    content = content.slice(0,-1)
    this.setState({ content: content })
  }

  handleCellClick(i) {
    this.setState({ 
      content: this.state.content + i,
      pressStyle: i })
    }

  renderCell(i, width) {
    let cellStyle = {backgroundColor: "#FCFCFC"}
    if ( i === this.state.pressStyle) {
      cellStyle = {backgroundColor: "#E1E1E1"}
    }

    return (
      <Grid.Column 
      width={width}
      style={ cellStyle }
      onMouseDown={ () => { this.handleCellClick(i) } 
      }>
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
      operator: i,
      equalsTriggered: 0,
      backupContent: null,
      pressStyle: i }) 
  }

  renderOperator(i) {
    let operatorStyle = { backgroundColor: "#FFA500" }
    if (i === this.state.pressStyle) {
      operatorStyle = { backgroundColor: "#D88C00"}
    }
    return (
      <Grid.Column 
      style={ operatorStyle } 
      onMouseDown={ () => {this.handleOperatorClick(i)} 
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
        backupContent: null,
        pressStyle: i  }) 
    }

  renderCommand(i,width) {
    let commandStyle = { backgroundColor: "#E1E1E1" }
    if (i === this.state.pressStyle) {
      commandStyle = { backgroundColor: "#D1D1D1"}
    }
    return (
      <Grid.Column
      width={width}
      style={ commandStyle } 
      onMouseDown={ () => {this.handleCommandClick(i)}
      }> 
      {i}
      </Grid.Column>
    );
  }

  handleEqualsClick() {
    let x = this.state
    let result 
    let operator = x.operator
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
      backupContent: backupContent,
      pressStyle: "="

    })
  }

  renderEquals() {
    let equalsStyle = { backgroundColor: "#FFA500" }
    if ("=" === this.state.pressStyle) {
      equalsStyle = { backgroundColor: "#D88C00"}
    }
    return (
      <Grid.Column 
      style={ equalsStyle } 
      onMouseDown={ () => {this.handleEqualsClick()} // function end
      }> 
      =
      </Grid.Column>
    );
  } // renderEquals end. 

  renderInputBar() {
    return(
      <Input 
      fluid
      className="input-bar"
      placeholder={this.state.placeholder}
      value={this.state.content}
      onChange={(event) => this.setState({ content: event.target.value })}
      />
    );
  }

  componentDidMount() {
   window.addEventListener('keydown', (event) => this.updateInput(event.key) )
   window.addEventListener('keyup', (event) => this.setState({ pressStyle: '' }) )
   window.addEventListener('mouseup', (event) => this.setState({ pressStyle: '' }) )
  } 

  componentWillUnmount() {
    window.removeEventListener('keydown', (event) => this.updateInput(event.key) )
    window.removeEventListener('keyup', (event) => this.setState({ pressStyle: '' }) )
    window.removeEventListener('mouseup', (event) => this.setState({ pressStyle: '' }) )

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