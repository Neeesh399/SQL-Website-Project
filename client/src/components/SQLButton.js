import React from 'react'
import axios from 'axios'

export function SQLGenerateButton(props){
    const handleSubmit = (event) => {
      event.preventDefault()
      let returnArr = {}
      
      let tables = []
      let attributes = []
      console.log(props.allElements)
      for (const [,value] of Object.entries(props.allElements)){
        if (value.eletype === "table"){
          tables.push(value)
        }
        else if (value.eletype === "attribute"){
          attributes.push(value)
        }
      }
      returnArr["tables"] = tables
      returnArr["attributes"] = attributes
      console.log(JSON.stringify(returnArr))
  
      axios.post("/posts", {
        myTables: tables,
        myAttributes: attributes
      }).then(response => {
        console.log(response.data)
      }).catch(err => {
        console.log(err)
      })
    }
  
    return (
      <div>
        <form
          method="POST"
          onSubmit={event => handleSubmit(event)}
        >
          <button variant="contained" type="submit"> SQLify </button>
        </form>
  
        
      </div>
    )
  }
  
