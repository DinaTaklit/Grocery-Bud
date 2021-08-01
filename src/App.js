import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name, setName] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [list, setList] = useState([])
  const [itemID, setItemID] = useState(null)
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
      // Edit the item with the given id
      setList(list.map((item) => {
        if(item.id === itemID) {
          return { ...item, title: name }
        }
        return item
      }))
      setName('')
      setItemID(null)
      setIsEditing(false)
      showAlert(true, 'success', `name is updated`)
    } else {
      // Add new item
      AddItem()
    }
  }

  // Function that add new item to the list
  const AddItem = () => {
    const newItem = {
      id: new Date().getTime().toString(),
      title: name
    }
    setList([...list, newItem])
    showAlert(true, 'success', `${name} is created`)
    setName("")
  }

  // Function that edit item with the given id
  const editItem = (id) => {
    const itemEdit = list.find(item => item.id === id)
    setIsEditing(true)
    setItemID(id)
    setName(itemEdit.title)
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
            <List list={list} editItem={editItem}/>
            <button className='clear-btn'>clear items</button>
          </div>
        )
      }
    </section>
  )
}

export default App