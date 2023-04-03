import { useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom'

interface Event {
  value: string
}

const login = () => {

  const [user, setUser] = useState({
    name: '',
    password: ''
  })

  const onInputChange = ({ target }: any) => {
    const { name, value } = target
    setUser({
      ...user,
      [name]: value
    })
  }

  const onSubmitForm = async (event: React.FormEvent) => {
    event.preventDefault();    
        

  }


  return (
    <main className='container'>
      <form onSubmit={onSubmitForm}>
        <h1>Login</h1>
        <div>
          <input type="text" placeholder='Username' onChange={onInputChange} name='name' />
          <input type="password" placeholder='Password' onChange={onInputChange} name='password' />
          <button>Login</button>
        </div>
        <div className='forgot'>
          <Link to="#">Forgot your password?</Link>
          <Link to="register">Register</Link>
        </div>
      </form>
    </main>
  )
}

export default login
