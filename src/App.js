import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name, setName] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
  }
  return (
    <section className="section-center">
      <from className="grocery-from" onSubmit={handleSubmit}>
        <h3>grocery bud</h3>
        <div className="form-control">
          <input 
            type="text"
            className="grocery" 
            placeholder="e.g. eggs"
            value={name}
            onChange={(event) => {setName(event.target.value)}}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? 'Edit' : 'Submit'}
          </button>
        </div>
      </from>
    </section>
  )
}

export default App