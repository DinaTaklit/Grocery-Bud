import { useEffect } from 'react'

const Alert = ({type, msg, showAlert, list}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert()
    }, 5000)

    return () => {
      clearTimeout(timeout)
    }
  }, [list])  
  return (
    <p className={`alert alert-${type}`}>
      {msg}
    </p>
  )
}

export default Alert