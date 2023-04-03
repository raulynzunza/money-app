import { useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom'
import { onLogin } from '../../api/singinForm'
import AlertDanger from '../../components/AlertDanger'

interface Event {
  value: string
}

const login = () => {

  const [user, setUser] = useState({
    name: '',
    password: ''
  })

  const [flag, setFlag] = useState(false)
  const [message, setMessage] = useState('')

  const onInputChange = ({ target }: any) => {
    const { name, value } = target
    setUser({
      ...user,
      [name]: value
    })
  }

  const onSubmitForm = async (event: any) => {
    event.preventDefault();

    const email = event.target[0].value;
    const password = event.target[1].value;

    const { flag, message } = await onLogin(email, password);

    setFlag(flag);
    setMessage(message);

    setTimeout(() => {
      setFlag(false)
      setMessage('');
    }, 5000)


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
          {

            message === 'auth/wrong-password'
            &&// @ts-ignore
            <AlertDanger alert="alert alert-danger text-center animate__animated animate__fadeIn" message="User registered succesfully!" message="Email or password is incorrect" />

          }
        </div>
      </form>
    </main>
  )
}

export default login
