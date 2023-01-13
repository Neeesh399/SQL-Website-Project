import React from 'react'

import { useDrag } from 'react-dnd';


export const MyDraggables = {
    TABLE: "table",
    ATTRIBUTE: "attribute",
    RELATIONSHIP: "relationship"
}

export function TableDraggable(props){
    const [, drag] = useDrag(() => ({
      type: MyDraggables.TABLE,
      item: { 
        name: props.name,
        id: props.id, 
        x: props.x,
        y: props.y
      },
      end: (item, monitor) => {
        if (props.x !== -1){
          props.reloadParent()
        }
      }
    }))
  
    return (
      <div 
        className={props.name} 
        ref={drag}
        width="150px"
        name={props.name}
        id={props.id}
      >
        <input
          className='internalText'
          type="text"
          value={props.name}
          onChange={() => {
            console.log("test")
          }} 
        />  
      </div>
      
    )
}

export function AttributeDraggable(props){
    const [, drag] = useDrag(() => ({
      type: MyDraggables.ATTRIBUTE,
      item: { 
        name: props.name,
        id: props.id, 
        x: props.x,
        y: props.y
      },
      end: (item, monitor) => {
        if (props.x !== -1){
          props.reloadParent()
        }
      }
    }))
  
    return (
      <div 
        className={props.name} 
        ref={drag}
        width="150px"
        name={props.name}
        id={props.id}
      >
        <input
          className='internalText'
          type="text"
          value={props.name}
          onChange={() => {
            console.log("test")
          }} 
        />  
      </div>
      
    )
}
  
export function RelationshipDraggable(props){
    const [, drag] = useDrag(() => ({
      type: MyDraggables.RELATIONSHIP,
      item: { 
        name: props.name,
        id: props.id, 
        x: props.x,
        y: props.y
      },
      end: (item, monitor) => {
        if (props.x !== -1){
          props.reloadParent()
        }
      }
    }))
  
    return (
      <div 
        className={props.name} 
        ref={drag}
        width="150px"
        name={props.name}
        id={props.id}
      >
        <input
          className='internalText'
          type="text"
          value={props.name}
          onChange={() => {
            console.log("test")
          }} 
        />  
      </div>
      
    )
} 
