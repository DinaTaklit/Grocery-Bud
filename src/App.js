import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

// Function that get the list from the local Storage
const getList = () => {
  const list = localStorage.getItem('list')
  if(list) {
    return JSON.parse(list)
  }
  return []
}

function App() {
  const [name, setName] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [list, setList] = useState(getList)
  const [itemID, setItemID] = useState(null)
  const [alert, setAlert] = useState( {
    show: false,
    type: '',
    msg: ''
  })

  // Save the list of item in the local Storage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  // Functon that handle the Submit button
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

  // Function that delete item with the given id
  const removeItem = (id) => {
    setList(list.filter(item => item.id !== id))
    showAlert(true, 'danger', `item is removed`)
  }

  // Function that clear the list of items
  const clearList = () => {
    showAlert(true, 'danger', 'List is removed')
    setList([])
  }

  // Function that show alert
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
            <List list={list} editItem={editItem} removeItem={removeItem}/>
            <button className='clear-btn' onClick={clearList}>clear items</button>
          </div>
        )
      }
    </section>
  )
}

export default App