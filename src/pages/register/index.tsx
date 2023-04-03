import { useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom'
import { onRegister } from '../../api/register'
import 'animate.css';

import AlertSuccess from '../../components/AlertSuccess'
import AlertDanger from '../../components/AlertDanger'

interface Event {
  value: string
}

const register = () => {

  const [user, setUser] = useState({
    name: '',
    password: ''
  })

  const [alert, setAlert] = useState(false)
  const [message, setMessage] = useState('')

  const onInputChange = ({ target }: any) => {
    const { name, value } = target
    setUser({
      ...user,
      [name]: value
    })
  }

  const onSubmitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    const { flag, message } = await onRegister(user);
    setAlert(flag);
    setMessage(message);

    setTimeout(() => {
      setAlert(false)
      setMessage('');
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
              <AlertSuccess alert="alert-message alert alert-success text-center animate__animated animate__fadeIn" message="User registered succesfully!" />                                                 
          }
          {
            message === 'auth/invalid-email'
            ?
            // @ts-ignore
            <AlertDanger alert="alert alert-danger text-center animate__animated animate__fadeIn" message="User registered succesfully!" message="The email you entered is not valid"/>                
            :
              message === 'auth/weak-password' 
              ?
              // @ts-ignore
              <AlertDanger alert="alert alert-danger text-center animate__animated animate__fadeIn" message="User registered succesfully!" message="Your password must be at least 6 digits"/> 
              :
                message === 'auth/missing-password'
                ?// @ts-ignore
                <AlertDanger alert="alert alert-danger text-center animate__animated animate__fadeIn" message="User registered succesfully!" message="You must write a password"/> 
                :
                  message === 'auth/email-already-in-use'
                  &&// @ts-ignore
                  <AlertDanger alert="alert alert-danger text-center animate__animated animate__fadeIn" message="User registered succesfully!" message="There is already an account with that email"/> 
          }     

        </div>
      </form>
    </main>
  )
}

export default register
