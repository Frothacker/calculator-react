import React, { Component } from 'react'
import { Container, Grid } from 'semantic-ui-react'
import './index.css'

import Cell from "./buttons/Cell"
import Operator from "./buttons/Operator"
import Command from "./buttons/Command"
import Equals from "./buttons/Equals"
import InputBar from "./InputBar"
import Info from "./Info"

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
    
    if ( parseInt(key, 10) || key === "0") {  // if key is a number, handle click as integar. 
      this.handleCellClick(parseInt(key, 10)) 
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

  renderRow ({ numbers, operator, width}) {
    const style = this.state.pressStyle
    return ( 
      <Grid.Row key={numbers}>
        {
          numbers.map( num => {
            return <Cell key={num} i={num} width={width} onClick={ () => this.handleCellClick(num) } style={style}/>
          })
        }
        <Operator key={operator} i={operator} width={width} onClick={ () => this.handleOperatorClick(operator) } style={style}/>
      </Grid.Row>
    )
  }

  renderCommandRow ({ commands, operator, width}) {
    const style = this.state.pressStyle
    return (
      <Grid.Row>
        {
          commands.map( num => {
            return <Command key={num} i={num} width={width} onClick={ () => this.handleCommandClick(num) } style={style}/>
          })
        }
        <Operator key={operator} i={operator} width={width} onClick={ () => this.handleOperatorClick(operator) } style={style}/>
      </Grid.Row>
    )
  }

  renderMain({cellNameAndWidth}) {
    return(
      cellNameAndWidth.map( info => {  
        const [nums, operator] = info
        return this.renderRow({numbers: nums, operator: operator, width: 4})
      })
    )
  }

  renderBottomRow({cellNameAndWidth, equalsWidth}) {    
    const style = this.state.pressStyle 
    return(
        <Grid.Row>
          {              
            cellNameAndWidth.map( info => {
              const [nums,width] = info
              return <Cell key={nums} i={nums} width={width} onClick={ () => this.handleCellClick(nums) } style={style}/>
            })
          }
          <Equals key="equals" style={style} width={equalsWidth} onClick={ () => this.handleEqualsClick() }/>
        </Grid.Row>
    )
  }
  
  render() {
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
          {this.renderCommandRow({commands: ["AC","+/-","%"], operator: 'x', width: 4})}
          {this.renderMain({ cellNameAndWidth: [ [[7,8,9],'/'], [[4,5,6],'+'], [[1,2,3],'-']] }) }
          {this.renderBottomRow({cellNameAndWidth: [ [0,8], [".",4] ] , equalsWidth: 4 }) }
        </Grid>
        <Info />
      </Container> 
    );
  }
}
export default Calculator;