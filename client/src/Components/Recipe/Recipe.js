import React from 'react'

const Recipe = (props) => {
  return (
    <div>
        <h1>{props.title}</h1>
        <h3>{props.description}</h3>
    </div>
  )
}

export default Recipe