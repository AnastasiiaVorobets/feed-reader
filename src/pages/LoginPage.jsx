import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

function LoginPage() {
  const [users, setUsers] = useState([]);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) {
          throw new Error(res)
        } else {
          return res.json()
        }
      })
      .then(setUsers)
      .catch((e) => console.log(e))
  }, [])
  
  const handleLogin = (e, username, password) => {
    e.preventDefault()

    const user = users
      .find((user) => user.username === username && user.email === password);

   user ? navigate('/feeds') : setLoginError(true);
  };

  return (
    <div>
      <form
        onSubmit={(e) => handleLogin(e, username, password)} className='form'>
      <h2>Login to your account!</h2>
      <div>
        <input
          className='form__field'
          type="text"
          value={username}
          placeholder='Username'
          required
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div>
        <input
          className='form__field'
          type="password"
          value={password}
          placeholder='Password'
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className='form__button'
      >
        Login
      </button>
      {loginError &&
        <p className='loginError'>Invalid username or password!</p>
      }
    </form>
    </div>
  );
}

export default LoginPage;
