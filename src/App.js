import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name, setName] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [list, setList] = useState([])
  const [alert, setAlert] = useState( {
    show: false,
    type: '',
    msg: ''
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    if(!name) {
      showAlert(true, 'danger', 'Name is required')
    } else if (name && isEditing) {
      showAlert(true, 'success', `${name} is updated`)
      setIsEditing(false)
    } else {
      // Add new item
      AddItem()
    }
  }

  // Function that add new item to the list
  const AddItem = () => {
    const newItem = {
      id: new Date().getTime().toString,
      title: name
    }
    setList([...list, newItem])
    showAlert(true, 'success', `${name} is created`)
    setName("")
  }
  
  const showAlert = (show=false, type='', msg='') => {
    setAlert({
      show,
      type,
      msg
    })
  }

  return (
    <section className="section-center">
      <form className="grocery-from" onSubmit={handleSubmit}>
        {console.log(alert.show)}
        {alert.show && <Alert {...alert} showAlert={showAlert} list={list}/>}
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
      </form>
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