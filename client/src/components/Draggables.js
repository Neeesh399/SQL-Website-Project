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
      getItem.id = props.id;
    }

    const handleDrop = (item) => {
        console.log("dropped!")
        console.log(item)
    }

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
        ref={(el) => {drag(el); drop(el);}}
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
