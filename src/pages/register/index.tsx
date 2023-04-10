import { useState } from 'react';
import './register.css';
import { Link } from 'react-router-dom'
import { onRegister } from '../../api/register'
import 'animate.css';

import { postMoney } from '../../api/rest'

import AlertSuccess from '../../components/AlertSuccess'
import AlertDanger from '../../components/AlertDanger'

interface Event {
  value: string
}

const register = () => {

  const [user, setUser] = useState({
    name: '',
    password: '',
    money: ''
  })

  const [alert, setAlert] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setLoading] = useState(false)

  const onInputChange = ({ target }: any) => {
    const { name, value } = target
    setUser({
      ...user,
      [name]: value
    })
  }

  const onSubmitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    const { flag, message } = await onRegister(user);
    message === 'User registered successfully' && await postMoney(user.money, user.name)
    setLoading(false)
    setAlert(flag);
    setMessage(message);

  }


  return (
    <main className='container'>
      <form onSubmit={onSubmitForm} className='form'>
        <h1>Register</h1>
        <div>
          <input type="email" placeholder='Email' onChange={onInputChange} name='name' className='inputs'/>
          <input type="password" placeholder='Password' onChange={onInputChange} name='password' className='inputs'/>
          <input type="number" placeholder='Current money' onChange={onInputChange} name='money' className='inputs'/>
          <button className='button'>Register</button>
          <div className="forgot">
            <Link to="/">Back to login</Link>
          </div>
          {
            isLoading
            &&
            <div className="spinner-border text-primary spin" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>

          }
          {
            alert
            &&
            <AlertSuccess alert="alert-message alert alert-success text-center animate__animated animate__fadeIn" message="User registered succesfully!" />
          }
          {
            message === 'auth/invalid-email'
              ?

              <AlertDanger alert="alert alert-danger text-center animate__animated animate__fadeIn" message="The email you entered is not valid" />
              :
              message === 'auth/weak-password'
                ?

                <AlertDanger alert="alert alert-danger text-center animate__animated animate__fadeIn" message="Your password must be at least 6 digits" />
                :
                message === 'auth/missing-password'
                  ?
                  <AlertDanger alert="alert alert-danger text-center animate__animated animate__fadeIn" message="You must write a password" />
                  :
                  message === 'auth/email-already-in-use'
                  &&
                  <AlertDanger alert="alert alert-danger text-center animate__animated animate__fadeIn" message="There is already an account with that email" />
          }

        </div>
      </form>
    </main>
  )
}

export default register
