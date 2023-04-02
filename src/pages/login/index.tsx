import './index.css';

const login = () => {

  const onSubmitForm = (event: React.FormEvent) => {    
    event.preventDefault();
  }

  return (    
    <main className='container'>
      <form onSubmit={onSubmitForm}>
        <h1>Login</h1>
        <div>
          <input type="text" placeholder='Username'/>
          <input type="password" placeholder='Password'/>
          <button>Login</button>
        </div>
        <div className='forgot'>
          <a href="#">Forgot your password?</a>
          <a href="#">Register</a>
        </div>
      </form>   
    </main>
  )
}

export default login
