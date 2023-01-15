import React from 'react'

import { useDrop } from 'react-dnd';

import { MyDraggables, RelationshipDraggable, TableDraggable, AttributeDraggable } from './Draggables';

export function GridSquare(props){
    let board = null
    
    let currentGrid = props.currElements();
    let key = String(props.x) + "." + String(props.y); 
    if (key in currentGrid){
      let copyOfItem = props.board[key]
      switch(copyOfItem.name){
        case MyDraggables.TABLE:
          board = (<TableDraggable name={copyOfItem.name} id={copyOfItem.id} x={copyOfItem.x} y={copyOfItem.y} />)
          break
        case MyDraggables.ATTRIBUTE:
          board = (<AttributeDraggable name={copyOfItem.name} id={copyOfItem.id} x={copyOfItem.x} y={copyOfItem.y} />)
          break
        case MyDraggables.RELATIONSHIP:
          board = (<RelationshipDraggable name={copyOfItem.name} id={copyOfItem.id} x={copyOfItem.x} y={copyOfItem.y} />)
          break
        default:
          break
      }
    }
  
    const [{isOver}, drop] = useDrop(() => ({
      accept: [MyDraggables.TABLE, MyDraggables.ATTRIBUTE, MyDraggables.RELATIONSHIP],
      drop: (item) => handleDrop(item),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      })
    }))
  
    const handleDrop = (item) => {
      if (item.name === "attribute" && item.id === 0){
        //Do nothing
      }
      else{
        let tempKey = String(item.x) + "." + String(item.y)
        let tempElements = props.currElements()
        let copyOfItem = JSON.parse(JSON.stringify(item));
        copyOfItem.x = props.x;
        copyOfItem.y = props.y;
        if (tempElements[tempKey] !== undefined){
          copyOfItem.name = tempElements[tempKey].name
        }
        item.id = 0
        props.myFunc(copyOfItem, item.x, item.y)
        
      }
    }
  
    return (
      <div className='square' style={props.style} ref={drop}>
        {board}
      </div>
    )
}

/*
export function GridSquare(props){
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
      if (item.name === "attribute" && item.id === 0){
        //Do nothing
      }
      else{
        let tempKey = String(item.x) + "." + String(item.y)
        let tempElements = props.currElements()
        let copyOfItem = JSON.parse(JSON.stringify(item));
        copyOfItem.x = props.x;
        copyOfItem.y = props.y;
        if (tempElements[tempKey] !== undefined){
          copyOfItem.name = tempElements[tempKey].name
        }
        item.id = 0
        props.myFunc(copyOfItem, item.x, item.y)
      }
    }
  
    return (
      <div className='square' style={props.style} ref={drop}>
        {board[0]}
      </div>
    )
  }
*/