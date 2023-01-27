import React from 'react'

import { useDrop } from 'react-dnd';

import { MyDraggables, RelationshipDraggable, TableDraggable, AttributeDraggable } from './Draggables';

export function GridSquare(props){
  let board = null
  let relationships = []

  let currentGrid = props.board;
  let key = String(props.x) + "." + String(props.y); 
  if (key in currentGrid){
    let copyOfItem = props.board[key]
    switch(copyOfItem.eletype){
      case MyDraggables.TABLE:
        board = (<TableDraggable eletype={copyOfItem.eletype} name={copyOfItem.name} tableid={copyOfItem.tableid} x={copyOfItem.x} y={copyOfItem.y} updateElement={props.updateElement} options={copyOfItem.options} setFocusElementKey={props.setFocusElementKey} board={props.board}/>)
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

    for (const [,value] of Object.entries(currentGrid)){
      //if the below condition is met, then there needs to be a line between the curr table and that attribute
      if (copyOfItem.eletype === "table" && value.eletype === "attribute" && value.tableid === copyOfItem.tableid){
        relationships.push(value)
      }
    }
  }

  const [{isOver}, drop] = useDrop(() => ({
    accept: [MyDraggables.TABLE, MyDraggables.ATTRIBUTE, MyDraggables.RELATIONSHIP],
    drop: (item) => handleDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true}),
    })
  }))

  const handleDrop = (item) => {
    if (item.eletype === "attribute" && item.tableid === 0){
      //Do nothing
    }
    else{
      let tempKey = String(item.x) + "." + String(item.y)
      let tempElements = props.board
      let copyOfItem = JSON.parse(JSON.stringify(item));
      copyOfItem.x = props.x;
      copyOfItem.y = props.y;
      copyOfItem.name = item.name;
      let options = item.options

      copyOfItem.options = options
      if (tempElements[tempKey] !== undefined){
        copyOfItem.eletype = tempElements[tempKey].eletype;
        copyOfItem.name = tempElements[tempKey].name;
      }
      item.tableid = 0
      props.myFunc(copyOfItem, item.x, item.y)
      
    }
  }

  let style = JSON.parse(JSON.stringify(props.style))
  if (isOver){
    style["backgroundColor"] = "rgba(253, 193, 43, 0.679)"
  }
  if (!isOver){
    style["backgroundColor"] = ""
  }

  let extraClass = "square";
  if (props.x === props.size/2 ){
    extraClass = [extraClass, "squareLeftWall"].join(" ")
  }
  else if (props.x === (props.size/2)-1 ){
    extraClass = [extraClass, "square squareRightWall"].join(" ")
  }
  if (props.y === props.size/2 ){
    extraClass = [extraClass, "square squareTopWall"].join(" ")
  }
  else if (props.y === (props.size/2)-1){
    extraClass = [extraClass, "square squareBottomWall"].join(" ")
  }

  return (
    <div className={extraClass} style={style} ref={drop}>
      {board}
    </div>
  )
}