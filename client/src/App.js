import React from 'react'

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
//import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';

import './App.css'
import Topbar from './components/Nav'
import { MyDraggables, RelationshipDraggable, TableDraggable, AttributeDraggable } from './components/Draggables';
import { GridSquare } from './components/GridSquare';
import { SQLGenerateButton } from './components/SQLButton';
import { AttributeElementOptions } from './components/ElementOptions'


function OptionsRight(props){
  const [, drop] = useDrop(() => ({
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
    <div id='optionsRight' ref={drop}> 
      <Topbar />
      <ElementContainer 
        delFromGrid={props.delFromGrid} 
        allElements={props.allElements}
      />
      <AttributeElementOptions currGrid={props.allElements} currFocus={props.focusElementKey} updateElementValues={props.updateElementValues} />
    </div>
  )
}

function ElementContainer(props){
  const [, drop] = useDrop(() => ({
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
    <div id='elementcontainer' ref={drop}>
      <SQLGenerateButton allElements={props.allElements} />
      <TableDraggable eletype={MyDraggables.TABLE} name={MyDraggables.TABLE} tableid={0} x={-1} y={-1} options={{}}/>
      <AttributeDraggable eletype={MyDraggables.ATTRIBUTE} name={MyDraggables.ATTRIBUTE} tableid={0} attrid={0} x={-1} y={-1} options = {{}}/>
      <RelationshipDraggable eletype={MyDraggables.RELATIONSHIP} name={MyDraggables.RELATIONSHIP} tableid={0} x={-1} y={-1}/>
    </div>
  )
}

class BodySection extends React.Component{
  constructor(props){
    super(props);
    const size = 8;
    const plswork = {};
    const history2 = [
      {
        currentGrid: {}
      }
    ]
    this.modGrid2 = this.modGrid2.bind(this)
    this.updateElementValues = this.updateElementValues.bind(this)
    this.setFocusElementKey = this.setFocusElementKey.bind(this)
    this.delFromGrid = this.delFromGrid.bind(this)

    this.state = {
      size: size,
      plswork: plswork,
      history2: history2,
      numSteps: 0,
      tableIdNums: 0,
      attrIdNums: 0,
      focusElementKey: null,
    };
  }

  modGrid2(element,x,y){
    const history2 = this.state.history2.slice(0,this.state.numSteps+1);
    const current = history2[history2.length-1]
    const currentGrid = Object.assign({}, current.currentGrid);
    let key = String(element.x) + "." + String(element.y);
    
    let tableIdNum = this.state.tableIdNums;
    let attrIdNum = this.state.attrIdNums;
    if (element.eletype === "table" && element.tableid === 0){
      tableIdNum++;
      element.tableid = tableIdNum;
    }
    else if(element.eletype === "attribute" && element.attrid === 0){
      attrIdNum++;
      element.attrid = attrIdNum;
    }

    if (x !== -1){
      let oldKey = String(x) + "." + String(y);
      delete currentGrid[oldKey];
    }
    
    if (element.eletype === "attribute" && currentGrid[key] != null && currentGrid[key].eletype === "table"){
      //Do Nothing
    }
    else{
      currentGrid[key] = element
    }
    
    this.setState({
      size: this.state.size,
      plswork: currentGrid,
      history2: history2.concat([
        {
          currentGrid: currentGrid
        }
      ]),
      numSteps: history2.length,
      tableIdNums: tableIdNum,
      attrIdNums: attrIdNum,
      focusElementKey: key,
    });
    console.log(currentGrid)
  }

  updateElementValues(options){
    const history2 = this.state.history2.slice(0,this.state.numSteps+1);
    const current = history2[history2.length-1]
    const currentGrid = Object.assign({}, current.currentGrid);
    let key = this.state.focusElementKey

    currentGrid[key].name = options.name
    currentGrid[key].options = options

    this.setState({
      size: this.state.size,
      plswork: currentGrid,
      history2: history2.concat([
        {
          currentGrid: currentGrid
        }
      ]),
      numSteps: history2.length,
      tableIdNums: this.state.tableIdNums,
      attrIdNums: this.state.attrIdNums,
      focusElementKey: key
    });
    //console.log(currentGrid)
  }

  delFromGrid(item){
    const history2 = this.state.history2.slice(0,this.state.numSteps+1);
    const current = history2[history2.length-1]
    const currentGrid = Object.assign({}, current.currentGrid);
    if (item.x !== -1){
      let oldKey = String(item.x) + "." + String(item.y);
      delete currentGrid[oldKey];
    }

    if (item.eletype === "table"){
      for (const [key,] of Object.entries(currentGrid)){
        let currObject = currentGrid[key]
        if (currObject.tableid === item.tableid){
          delete currentGrid[key]
        }
      }
    }

    this.setState({
      size: this.state.size,
      plswork: currentGrid,
      history2: history2.concat([
        {
          currentGrid: currentGrid
        }
      ]),
      numSteps: history2.length,
      tableIdNums: this.state.tableIdNums,
      attrIdNums: this.state.attrIdNums,
      focusElementKey: null,
    });
  }

  setFocusElementKey(x,y){
    if (x !== -1){
      let key = String(x) + "." + String(y);

      this.setState({
        size: this.state.size,
        plswork: this.state.plswork,
        history2: this.state.history2,
        numSteps: this.state.numSteps,
        tableIdNums: this.state.tableIdNums,
        attrIdNums: this.state.attrIdNums,
        focusElementKey: key,
      });

      document.getElementById("currFocusInput").focus()
    }
  }

  retrieveGrid(){
    const history2 = this.state.history2.slice(0,this.state.numSteps+1);
    return (history2[history2.length-1]).currentGrid
  }

  render (){   
    let gridArr = []
    let maxWidth = 95/this.state.size;
    let maxHeight = 95/this.state.size;

    let myStyling = {
      width: maxWidth+"vw",
      height: maxHeight+"vh"
    }

    for (let y=0; y<this.state.size; y++){
      let row = []
      for (let x=0; x<this.state.size; x++){
        row.push(
          <GridSquare 
            x={x} 
            y={y} 
            size={this.state.size}
            style={myStyling} 
            myFunc={this.modGrid2} 
            board={this.state.plswork}
            updateElement={this.updateElementValues}
            setFocusElementKey={this.setFocusElementKey}
          />
        )
      }
      gridArr.push(row)
    }
  
    return (
      <div id='wrapper'>
        <div id='gridLeft'>
          {
            gridArr.map((row, index) => (
              <div className='row' key={index}>{row}</div>
            ))
          }
        </div>
        <OptionsRight 
          delFromGrid={this.delFromGrid} 
          allElements={this.state.plswork}
          focusElementKey={this.state.focusElementKey}
          updateElementValues={this.updateElementValues}
        />
        <SVGHelper />
      </div>
    )
  };
}

function SVGHelper(props){
  let allTables = document.getElementsByClassName("table")
  let allAttributes = document.getElementsByClassName("attribute")

  console.log(allTables)
  console.log(allAttributes)
  return (
    <svg width='60%' height='100%' className='mySVG'>
      <line x1="0" y1="0" x2="200" y2="200" className='SVGLine' />
    </svg>
  )
}

function App(){

  return (
    <DndProvider backend={HTML5Backend}>
      <div id='root2' >
        <BodySection />
      </div>
    </DndProvider>
  )
}

export default App