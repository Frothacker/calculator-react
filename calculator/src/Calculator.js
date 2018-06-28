import React, { Component } from 'react';
import { Input, Container, Grid, Segment, Footer } from 'semantic-ui-react';
import './index.css';

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

function InputBar(props) {
  return(
    <Input 
    fluid
    className="input-bar"
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.onChange}
    />
  );
}

function Foot() {
  return(
    <Segment className="footer">
      Made by Finn
    </Segment>
  );
}

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
    let operators = ['-','/','x','+'] 
    
    if ( parseInt(key) || key === "0") {  // if key is a number, handle click as integar. 
      this.handleCellClick(parseInt(key)) 
    } else if ( operators.includes(key) ) { // handles case of other operators key input
      this.handleOperatorClick(key)
    } else if ( key === "%" ) { // handles case of "%" key input
      this.handleCommandClick("%")
    } else if ( key === "*" ) { // handles case of "*" key input, becasue * needs to send "x" to handleOperatorClick
      this.handleOperatorClick("x")
    } else if ( key === "Enter" || key === "=" ) { // handles case of "=" and "enter" key inputs
      this.handleEqualsClick(key)
    } else if ( key === "Backspace") { // handle backspace input
      this.handleDeleteClick(key)
    } else if ( key === "c") { // handles clear input. 
      this.handleCommandClick("AC")
    } else if ( key === ".") { // handles "." input. 
      this.handleCellClick(".")
    } else {
      console.log( key +" is not an operator or a number")
    }
  }

  handleDeleteClick(i) {
    let content = this.state.content
    content = content.slice(0,-1)
    this.setState({ content: content })
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
      pressStyle: i 
    }) 
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
      pressStyle: i  
    }) 
  }

  handleEqualsClick(i, width) {
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

  handleCellClick(i) {
    this.setState({ 
      content: this.state.content + i,
      pressStyle: i })
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
    let style = this.state.pressStyle
    return(
      <Container className="container">
        <InputBar 
          placeholder={this.state.placeholder}
          value={this.state.content} 
          onChange={(event) => this.setState({ content: event.target.value })}
        />
        <Grid 
        columns={4} 
        celled 
        textAlign='center' 
        className="all-buttons">
          <Grid.Row>
            <Command style={style} i="AC" width={4} onClick={ () => this.handleCommandClick("AC")} />
            <Command style={style} i="+/-" width={4} onClick={ () => this.handleCommandClick("+/-")} />
            <Command style={style} i="%" width={4} onClick={ () => this.handleCommandClick("%")} />
            <Operator i="x" width={4} onClick={ () => this.handleOperatorClick("x") } style={style}/>
          </Grid.Row>
          <Grid.Row>
            <Cell i={7} width={4} onClick={ () => this.handleCellClick(7) } style={style}/>
            <Cell i={8} width={4} onClick={ () => this.handleCellClick(8) } style={style}/>
            <Cell i={9} width={4} onClick={ () => this.handleCellClick(9) } style={style}/>
            <Operator i="/" width={4} onClick={ () => this.handleOperatorClick("/") } style={style}/>
          </Grid.Row>
          <Grid.Row>
            <Cell i={4} width={4} onClick={ () => this.handleCellClick(4) } style={style}/>
            <Cell i={5} width={4} onClick={ () => this.handleCellClick(5) } style={style}/>
            <Cell i={6} width={4} onClick={ () => this.handleCellClick(6) } style={style}/>
            <Operator i="+" width={4} onClick={ () => this.handleOperatorClick("+") } style={style}/>
          </Grid.Row>
          <Grid.Row>
            <Cell i={1} width={4} onClick={ () => this.handleCellClick(1) } style={style}/>
            <Cell i={2} width={4} onClick={ () => this.handleCellClick(2) } style={style}/>
            <Cell i={3} width={4} onClick={ () => this.handleCellClick(3) } style={style}/>
            <Operator i="-" width={4} onClick={ () => this.handleOperatorClick("-") } style={style}/>
          </Grid.Row>
          <Grid.Row>
            <Cell i={0} width={8} onClick={ () => this.handleCellClick(0) } style={style}/>
            <Cell i={"."} width={4} onClick={ () => this.handleCellClick(".") } style={style}/>
            <Equals style={style} onClick={ () => this.handleEqualsClick() }/>
          </Grid.Row>
        </Grid>
        <Info />
      </Container> 
    );
  }
}
export default Calculator;