import React, { useState } from 'react'

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';

import './App.css'
import Topbar from './components/Nav'

function GridSquare(props){
  //This is a test 2
  const [num, setNum] = useState(1)
  let board = []
  let currentGrid = props.currElements();
  let key = String(props.x) + "." + String(props.y); 
  if (key in currentGrid){
    let copyOfItem = currentGrid[key]
    board.push(<Draggables name={copyOfItem.name} id={copyOfItem.id} x={copyOfItem.x} y={copyOfItem.y} reloadParent={() => updateSquare()}/>)
  }

  function updateSquare(){
    setNum(prevNum => prevNum+1)
  }

  const [{isOver}, drop] = useDrop(() => ({
    accept: "table",
    drop: (item) => handleDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    })
  }))
  
  const handleDrop = (item) => {
    let copyOfItem = JSON.parse(JSON.stringify(item));
    copyOfItem.x = props.x;
    copyOfItem.y = props.y;
    props.myFunc(copyOfItem, item.x, item.y)
  }

  return (
    <div className='square' style={props.style} ref={drop}>
      {board[0]}
    </div>
  )
}

function Draggables(props){
  let typeToSrc = {}
  typeToSrc["table"] = "https://th.bing.com/th/id/R.34748973326465bb78ceea56f87e7bb3?rik=fb6HnWoY%2b9CcIg&pid=ImgRaw&r=0"
  
  const [{isDragging}, drag] = useDrag(() => ({
    type: "table",
    item: { 
      name: props.name,
      id: props.id, 
      x: props.x,
      y: props.y
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (props.x !== -1){
        props.reloadParent()
      }
    }
  }))

  return (
    /*<img
      ref={drag}
      src={typeToSrc[props.name]}
      width="150px"
      name={props.name}
      id={props.id}
      style={{ border: isDragging ? "5px solid pink" : "0px"}}
    />*/
    <div 
      className='table' style={{ border: isDragging ? "5px solid pink" : "0px"}}
      ref={drag}
      width="150px"
      name={props.name}
      id={props.id}
    >
      "TEST"  
    </div>
    
  )
}

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
    accept: "table",
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
      {
        props.starterDraggables.map((obj) => (
          <Draggables name={obj.name} id={obj.id} x={obj.x} y={obj.y}/>
        ))
      }
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
        }
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
    currentGrid[key] = element
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