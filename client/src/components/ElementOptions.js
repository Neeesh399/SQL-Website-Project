import React, {useState} from 'react'

 export function AttributeElementOptions(props){
    let focusElement = props.currGrid[props.currFocus]
    const [value, setValue] = useState("")
    const [internalValue, setInteralValue] = useState("")

    if (focusElement !== undefined && value !== focusElement.name){
        setValue(focusElement.name)
    }

    
    return (

      <div>
        <input 
          className=""
          type="text"
          value={value}
          onChange={(event) => {
            setInteralValue(event.target.value)
            let options = focusElement.options
            options["name"] = internalValue
            props.updateElement(options)
          }}
          onBlur={(event) => {
            let options = focusElement.options
            options["name"] = value
            options["test"] = "mytest"
            props.updateElement(options)
          }}
        >
          
  
        </input>
      </div> 
    )
  }
  