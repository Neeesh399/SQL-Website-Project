import React, { useState } from 'react'

import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';

export const MyDraggables = {
    TABLE: "table",
    ATTRIBUTE: "attribute",
    RELATIONSHIP: "relationship"
}

export function TableDraggable(props){
  const [value, setValue] = useState(props.name)

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
    getItem.id = props.id;
  }

  const handleDrop = (item) => {
      //Do nothing on drop
  }

  const [, drag] = useDrag(() => ({
    type: MyDraggables.TABLE,
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
      ref={(el) => {drag(el); drop(el);}}
      width="150px"
      eletype={props.eletype}
      name={props.name}
      id={props.eletype + "." + props.id}
      onClick={() => {
        if (props.id !== 0){
          let myInput = document.getElementById(props.eletype + "." + props.id).getElementsByClassName('internalText');
          myInput[0].focus()
        }
      }}
    >
      <input
        className='internalText'
        type="text"
        value={value}
        onChange={(event) => {
          if (props.id !== 0){
            setValue(event.target.value)
          }
        }}
        onBlur={(event) => {
          props.updateElement(props.x, props.y, value)
        }} 
      />  
    </div>
    
  )
}

export function AttributeDraggable(props){
  const [value, setValue] = useState(props.name)

    const [, drag] = useDrag(() => ({
      type: MyDraggables.ATTRIBUTE,
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
        id={props.eletype + "." + props.id}
        onClick={() => {
          if (props.id !== 0){
            let myInput = document.getElementById(props.eletype + "." + props.id).getElementsByClassName('internalText');
            myInput[0].focus()
          }
        }}
      >
        <input
          className='internalText'
          type="text"
          value={value}
          onChange={(event) => {
            if (props.id !== 0){
              setValue(event.target.value)
            }
          }}
          onBlur={(event) => {
            props.updateElement(props.x, props.y, value)
          }} 
        />  
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
