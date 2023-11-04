import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import '../../styles/style.scss';

function Login() {
  const [users, setUsers] = useState([]);
  const [loginError, setLoginError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error(response);
        } else {
          return response.json();
        }
      })
      .then(setUsers)
      .catch((error) => console.log(error));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (user) => user.username === username && user.email === password
    );

    user ? navigate('/feeds') : setLoginError(true);
  };

  return (
    <div>
      <form
        onSubmit={handleLogin}
        className='form'
      >
        <h2>Login to your account!</h2>
        <div>
          <input
            className='form__field'
            type="text"
            value={username}
            placeholder='Username'
            required
            onChange={(e) => setUsername(e.target.value)}
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
        <button className='form__button'>Login</button>
        {loginError && (
          <p className='loginError'>Invalid username or password!</p>
        )}
      </form>
    </div>
  );
}

export default Login;
