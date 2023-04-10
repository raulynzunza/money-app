import { useEffect, useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom'
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

  const [login, setLogin] = useState({
    flag: false,
    message: '',
    token: ''
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

    const email = event.target[0].value;
    const password = event.target[1].value;
    
    setLoading(true);

    const { flag, message, token } = await onLogin(email, password);        

    setLogin({
      flag,
      message,
      token
    });

    setLoading(false);


  }

  useEffect(() => {
    if (login.token.length > 0) {
      localStorage.setItem('token', login.token);
      navigate('/menu')
    }
  }, [login])
  


  return (
    <main className='container'>
      <form onSubmit={onSubmitForm} className='form'>
        <h1>Login</h1>
        <div>
          <input type="text" placeholder='Username' onChange={onInputChange} name='name' className='inputs'/>
          <input type="password" placeholder='Password' onChange={onInputChange} name='password' className='inputs'/>
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

            login.message === 'auth/wrong-password'
            &&
            <AlertDanger alert="alert alert-danger text-center animate__animated animate__fadeIn" message="Email or password is incorrect" />

          }
        </div>
      </form>
    </main>
  )
}

export default login
