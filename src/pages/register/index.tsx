import { useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom'
import { onRegister } from '../../api/register'
import 'animate.css';

interface Event {
  value: string
}

const login = () => {

  const [user, setUser] = useState({
    name: '',
    password: ''
  })

  const [alert, setAlert] = useState(false)

  const onInputChange = ({ target }: any) => {
    const { name, value } = target
    setUser({
      ...user,
      [name]: value
    })
  }

  const onSubmitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    const flag = await onRegister(user)
    setAlert(flag)

    setTimeout(() => {
      setAlert(false)
    }, 5000)

  }


  return (
    <main className='container'>
      <form onSubmit={onSubmitForm}>
        <h1>Register</h1>
        <div>
          <input type="text" placeholder='Username' onChange={onInputChange} name='name' />
          <input type="password" placeholder='Password' onChange={onInputChange} name='password' />
          <button>Register</button>
          <div className="forgot">
            <Link to="/">Back to login</Link>
          </div>
          {
            alert
            &&
            <div>
              <div className={`alert-message alert alert-success text-center animate__animated animate__fadeIn `} role="alert">
                User registered succesfully!
              </div>
            </div>
          }

        </div>
      </form>
    </main>
  )
}

export default login
