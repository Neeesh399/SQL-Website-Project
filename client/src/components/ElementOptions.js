import React, {useState} from 'react'

 export function AttributeElementOptions(props){
    let focusElement = props.currGrid[props.currFocus]
    const [value, setValue] = useState("")

    if (focusElement !== undefined && value !== focusElement.name){
        setValue(focusElement.name)
    }

    /*onBlur={(event) => {
            let options = focusElement.options
            options["name"] = value
            options["test"] = "mytest"
            props.updateElementValues(options)
          }}*/

    return (

      <div>
        <input 
          className=""
          type="text"
          value={value}
          id="currFocusInput"
          onChange={(event) => {
            let temp = event.target.value
            let options = focusElement.options
            options["name"] = temp
            props.updateElementValues(options)
          }}
        >
      
        </input>
      </div> 
    )
  }
  