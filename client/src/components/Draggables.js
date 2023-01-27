import React from 'react'

import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';

export const MyDraggables = {
    TABLE: "table",
    ATTRIBUTE: "attribute",
    RELATIONSHIP: "relationship"
}

export function TableDraggable(props){
  const [{isOver, canDrop, getItem}, drop] = useDrop(() => ({
    accept: [MyDraggables.ATTRIBUTE, MyDraggables.RELATIONSHIP],
    drop: (item) => handleDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
      getItem: monitor.getItem(),
    })
  }))

  if (isOver && canDrop){
    getItem.tableid = props.tableid;
  }

  const handleDrop = (item) => {
      //Do nothing on drop
  }

  
  let tempName = props.name;
  /*let key = String(props.x) + "." + String(props.y); 
  if (props.x !== -1 && props.board[key] !== undefined){
    tempName = props.board[key].name
    console.log(tempName)
  }*/

  const [, drag] = useDrag(() => ({
    type: MyDraggables.TABLE,
    item: { 
      eletype: props.eletype,
      name: tempName,
      tableid: props.tableid, 
      options: props.options,
      x: props.x,
      y: props.y
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  /*if (props.x !== -1 && isDragging){
    let myItem = document.getElementById(props.eletype + "." + props.tableid);
    let options = props.options
    options["pixelX"] = myItem.getBoundingClientRect().x
    options["pixelY"] = myItem.getBoundingClientRect().y
    props.updateElement(options)
  }*/

  return (
    <div 
      className={props.eletype} 
      ref={(el) => {drag(el); drop(el);}}
      width="150px"
      eletype={props.eletype}
      name={props.name}
      options={props.options}
      id={props.eletype + "." + props.tableid}
      tableid={props.tableid}
      onClick={() => {
        props.setFocusElementKey(props.x,props.y)
      }}
    >
      <p className='internalText'>
        {props.name}
      </p>  
    </div>
    
  )
}

export function AttributeDraggable(props){
    const [, drag] = useDrag(() => ({
      type: MyDraggables.ATTRIBUTE,
      item: { 
        eletype: props.eletype,
        name: props.name,
        tableid: props.tableid, 
        attrid: props.attrid,
        options: props.options,
        x: props.x,
        y: props.y
      },
    }))
  
    return (
      <div 
        className={props.eletype} 
        ref={drag}
        width="150px"
        eletype={props.eletype}
        name={props.name}
        id={props.eletype + "." + props.tableid + "." + props.attrid}
        tableid={props.tableid}
        onClick={() => {
          props.setFocusElementKey(props.x,props.y)
        }}
      >
        <p className='internalText'>
          {props.name}
        </p>  
      </div>
      
    )
}
  
export function RelationshipDraggable(props){
    const [, drag] = useDrag(() => ({
      type: MyDraggables.RELATIONSHIP,
      item: { 
        eletype: props.eletype,
        name: props.name,
        id: props.id, 
        x: props.x,
        y: props.y
      },
    }))
  
    return (
      <div 
        className={props.eletype} 
        ref={drag}
        width="150px"
        eletype={props.eletype}
        name={props.name}
        id={props.id}
      >
        <input
          className='internalText'
          type="text"
          value={props.eletype}
          onChange={() => {
            //console.log("test")
          }} 
        />  
      </div>
      
    )
} 
