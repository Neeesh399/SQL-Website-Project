import React, { useState } from 'react'

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';

import './App.css'
import Topbar from './components/Nav'
import { MyDraggables, RelationshipDraggable, TableDraggable, AttributeDraggable } from './components/Draggables';
import { GridSquare } from './components/GridSquare';

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
    props.delFromGrid(item)
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
    
    let idNum = this.state.idNums;
    if (element.name === "table" && element.id === 0){
      idNum++;
      element.id = idNum
    }

    if (x !== -1){
      let oldKey = String(x) + "." + String(y);
      delete currentGrid[oldKey];
    }
    
    if (element.name === "attribute" && currentGrid[key] != null && currentGrid[key].name === "table"){
      //Do Nothing
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
      idNums: idNum,
      starterDraggables: this.state.starterDraggables
    });
    console.log(currentGrid)
  }

  delFromGrid(item){
    const history2 = this.state.history2.slice(0,this.state.numSteps+1);
    const current = history2[history2.length-1]
    const currentGrid = Object.assign({}, current.currentGrid);
    if (item.x !== -1){
      let oldKey = String(item.x) + "." + String(item.y);
      delete currentGrid[oldKey];
    }

    if (item.name === "table"){
      for (const [key,value] of Object.entries(currentGrid)){
        let currObject = currentGrid[key]
        if (currObject.id == item.id){
          delete currentGrid[key]
        }
      }
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