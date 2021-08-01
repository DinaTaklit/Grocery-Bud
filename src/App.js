import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name, setName] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [list, setList] = useState([{id:"1", title:"first Item"}])
  const [alert, setAlert] = useState( {
    show: false,
    type: '',
    msg: ''
  })

  const handleSubmit = (event) => {
    event.preventDefault()
  }
  return (
    <section className="section-center">
      <from className="grocery-from" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert}/>}
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
      {
        list.length > 0 && (
          <div className="grocery-container">
            <List list={list}/>
            <button className='clear-btn'>clear items</button>
          </div>
        )
      }
    </section>
  )
}

export default App