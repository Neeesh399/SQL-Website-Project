import React from 'react'

import { useDrop } from 'react-dnd';

import { MyDraggables, RelationshipDraggable, TableDraggable, AttributeDraggable } from './Draggables';

export function GridSquare(props){
    let board = null
    
    let currentGrid = props.currElements();
    let key = String(props.x) + "." + String(props.y); 
    if (key in currentGrid){
      let copyOfItem = props.board[key]
      switch(copyOfItem.eletype){
        case MyDraggables.TABLE:
          board = (<TableDraggable eletype={copyOfItem.eletype} name={copyOfItem.name} tableid={copyOfItem.tableid} x={copyOfItem.x} y={copyOfItem.y} updateElement={props.updateElement} options={copyOfItem.options} setFocusElementKey={props.setFocusElementKey}/>)
          break
        case MyDraggables.ATTRIBUTE:
          board = (<AttributeDraggable eletype={copyOfItem.eletype} name={copyOfItem.name} tableid={copyOfItem.tableid} attrid={copyOfItem.attrid} x={copyOfItem.x} y={copyOfItem.y} updateElement={props.updateElement} options={copyOfItem.options} setFocusElementKey={props.setFocusElementKey}/>)
          break
        case MyDraggables.RELATIONSHIP:
          board = (<RelationshipDraggable eletype={copyOfItem.eletype} name={copyOfItem.name} tableid={copyOfItem.tableid} x={copyOfItem.x} y={copyOfItem.y} updateElement={props.updateElement}/>)
          break
        default:
          break
      }
    }
  
    const [, drop] = useDrop(() => ({
      accept: [MyDraggables.TABLE, MyDraggables.ATTRIBUTE, MyDraggables.RELATIONSHIP],
      drop: (item) => handleDrop(item),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      })
    }))
  
    const handleDrop = (item) => {
      if (item.eletype === "attribute" && item.tableid === 0){
        //Do nothing
      }
      else{
        let tempKey = String(item.x) + "." + String(item.y)
        let tempElements = props.currElements()
        let copyOfItem = JSON.parse(JSON.stringify(item));
        copyOfItem.x = props.x;
        copyOfItem.y = props.y;
        copyOfItem.name = item.name;
        copyOfItem.options = item.options
        if (tempElements[tempKey] !== undefined){
          copyOfItem.eletype = tempElements[tempKey].eletype;
          copyOfItem.name = tempElements[tempKey].name;
        }
        item.tableid = 0
        props.myFunc(copyOfItem, item.x, item.y)
        
      }
    }
  
    return (
      <div className='square' style={props.style} ref={drop}>
        {board}
      </div>
    )
}
