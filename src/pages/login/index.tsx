import { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom'
import AlertDanger from '../../components/AlertDanger'
import axios from 'axios'

const login = () => {

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [login, setLogin] = useState({
    flag: false,
  })

  const [isLoading, setLoading] = useState(false)

  const navigate = useNavigate()

  const onInputChange = ({ target }: any) => {
    const { name, value } = target
    setUser({
      ...user,
      [name]: value
    })
  }

  const onSubmitForm = async (event: any) => {
    event.preventDefault();

    setLoading(true);

    const userReply = await axios({
      url: `${import.meta.env.VITE_REACT_APP_API_URL}/users/${user.email}/${user.password}`,
      method: 'GET',
    })

    const res = await userReply

    if (res.data.message) {
      localStorage.setItem('userId', res.data.account.id)
      setLogin({
        flag: false,
      })
      navigate('/menu')
    }
    else {
      setLogin({
        flag: true,
      })
    }
    setLoading(false);

  }




  return (
    <main className='container'>
      <form onSubmit={onSubmitForm} className='form'>
        <h1>Login</h1>
        <div>
          <input type="email" placeholder='email' onChange={onInputChange} name='email' className='inputs' />
          <input type="password" placeholder='Password' onChange={onInputChange} name='password' className='inputs' />
          <button className='button'>Login</button>
        </div>
        <div className='forgot'>
          <Link to="#">Forgot your password?</Link>
          <Link to="register">Register</Link>
          {
            isLoading
            &&
            <div className="spinner-border text-primary spin" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>

          }
          {

            login.flag
            &&
            <AlertDanger alert="alert alert-danger text-center animate__animated animate__fadeIn" message="Email or password is incorrect" />

          }
        </div>
      </form>
    </main>
  )
}

export default login
