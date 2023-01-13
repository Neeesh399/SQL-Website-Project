import React, { useState } from 'react'

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';

import './App.css'
import Topbar from './components/Nav'
import { MyDraggables, RelationshipDraggable, TableDraggable, AttributeDraggable } from './components/Draggables';
import { GridSquare } from './components/GridSquare';

/*
function GridSquare(props){
  const [num, setNum] = useState(1)
  let board = []
  let currentGrid = props.currElements();
  let key = String(props.x) + "." + String(props.y); 
  if (key in currentGrid){
    let copyOfItem = currentGrid[key]
    switch (copyOfItem.name){
      case MyDraggables.TABLE:
        board[0] = (<TableDraggable name={copyOfItem.name} id={copyOfItem.id} x={copyOfItem.x} y={copyOfItem.y} reloadParent={() => updateSquare()}/>)
        break
      case MyDraggables.ATTRIBUTE:
        board[0] = (<AttributeDraggable name={copyOfItem.name} id={copyOfItem.id} x={copyOfItem.x} y={copyOfItem.y} reloadParent={() => updateSquare()}/>)
        break
      case MyDraggables.RELATIONSHIP:
        board[0] = (<RelationshipDraggable name={copyOfItem.name} id={copyOfItem.id} x={copyOfItem.x} y={copyOfItem.y} reloadParent={() => updateSquare()}/>)
        break
      default:
        break
    }
    
  }

  function updateSquare(){
    setNum(prevNum => prevNum+1)
  }

  const [{isOver}, drop] = useDrop(() => ({
    accept: [MyDraggables.TABLE, MyDraggables.ATTRIBUTE, MyDraggables.RELATIONSHIP],
    drop: (item) => handleDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    })
  }))

  const handleDrop = (item) => {
    let tempKey = String(item.x) + "." + String(item.y)
    let tempElements = props.currElements()
    let copyOfItem = JSON.parse(JSON.stringify(item));
    copyOfItem.x = props.x;
    copyOfItem.y = props.y;
    if (tempElements[tempKey] !== undefined){
      copyOfItem.name = tempElements[tempKey].name
    }
    props.myFunc(copyOfItem, item.x, item.y)
  }

  return (
    <div className='square' style={props.style} ref={drop}>
      {board[0]}
    </div>
  )
}
*/

class MyGrid extends React.Component{
  constructor(props){
    super(props)
    this.returnArr = []

    let maxWidth = 100/this.props.size;
    let maxHeight = 90/this.props.size;
    
    let myStyling = {
      width: maxWidth+"vw",
      height: maxHeight+"vh"
    }

    for (let y=0; y<this.props.size; y++){
      let row = []
      for (let x=0; x<this.props.size; x++){
        row.push(
          <GridSquare 
            x={x} 
            y={y} 
            style={myStyling} 
            myFunc={(element,x,y) => props.myFunc(element,x,y)} 
            currElements={() => props.currElements()}
          />
        )
      }
      this.returnArr.push(<div className='row'>{row}</div>)
    }
  }

  render (){
    return (
      this.returnArr
    )
  }
}

function OptionsLeft(props){
  const [{isOver}, drop] = useDrop(() => ({
    accept: [MyDraggables.TABLE, MyDraggables.ATTRIBUTE, MyDraggables.RELATIONSHIP],
    drop: (item) => handleDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    })
  }))
  
  const handleDrop = (item) => {
    props.delFromGrid(item.x,item.y)
  }

  return (
    <div id='optionsLeft' ref={drop}>
      <TableDraggable name={MyDraggables.TABLE} id={0} x={-1} y={-1}/>
      <AttributeDraggable name={MyDraggables.ATTRIBUTE} id={0} x={-1} y={-1}/>
      <RelationshipDraggable name={MyDraggables.RELATIONSHIP} id={0} x={-1} y={-1}/>
    </div>
  )
}

class BodySection extends React.Component{
  constructor(props){
    super(props);
    const size = 5;

    this.state = {
      size: size,
      history2: [
        {
          currentGrid: {}
        }
      ],
      numSteps: 0,
      idNums: 0,
      starterDraggables: [
        {
          name: "table", id: 0, x: -1, y: -1,
        },
        {
          name: "attribute", id: 0, x: -1, y: -1,
        },
        {
          name: "relationship", id: 0, x: -1, y: -1,
        },
      ],
    };
  }

  modGrid2(element,x,y){
    const history2 = this.state.history2.slice(0,this.state.numSteps+1);
    const current = history2[history2.length-1]
    const currentGrid = Object.assign({}, current.currentGrid);
    let key = String(element.x) + "." + String(element.y);
    element.id = this.retrieveID()

    if (x !== -1){
      let oldKey = String(x) + "." + String(y);
      delete currentGrid[oldKey];
    }
    
    if (element.name === "attribute" && currentGrid[key] != null && currentGrid[key].name === "table"){
      let newKey = this.findXY(element.x,element.y)
      currentGrid[newKey] = element
    }
    else{
      currentGrid[key] = element
    }

    this.setState({
      size: this.state.size,
      history2: history2.concat([
        {
          currentGrid: currentGrid
        }
      ]),
      numSteps: history2.length,
      idNums: this.state.idNums,
      starterDraggables: this.state.starterDraggables
    });
    console.log(currentGrid)
  }

  findXY(x,y){
    return String(x) + "." + String(y)
  }

  delFromGrid(x,y){
    const history2 = this.state.history2.slice(0,this.state.numSteps+1);
    const current = history2[history2.length-1]
    const currentGrid = Object.assign({}, current.currentGrid);
    if (x !== -1){
      let oldKey = String(x) + "." + String(y);
      delete currentGrid[oldKey];
    }
    this.setState({
      size: this.state.size,
      history2: history2.concat([
        {
          currentGrid: currentGrid
        }
      ]),
      numSteps: history2.length,
      idNums: this.state.idNums,
      starterDraggables: this.state.starterDraggables
    });
  }

  retrieveID(){
    this.setState({
      idNums: this.state.idNums+1,
    })
    return this.state.idNums;
  }

  retrieveGrid(){
    const history2 = this.state.history2.slice(0,this.state.numSteps+1);
    return (history2[history2.length-1]).currentGrid
  }

  render (){
    return (
      <div id='wrapper'>
        <OptionsLeft starterDraggables={this.state.starterDraggables} delFromGrid={(x,y) => this.delFromGrid(x,y)}/>
        <div id='gridRight'>
          <MyGrid 
            size={this.state.size}  
            myFunc={(element,x,y) => this.modGrid2(element,x,y)}
            currElements={() => this.retrieveGrid()}
          />
        </div>
      </div>
    )
  };
}


function App(){
  return (
    <DndProvider backend={HTML5Backend}>
      <div id='root2' >
        <Topbar />
        <BodySection />

      </div>
    </DndProvider>
  )
}

export default App