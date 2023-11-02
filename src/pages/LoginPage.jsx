import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login/Login';

function LoginPage() {
  const [users, setUsers] = useState([]);
  const [loginError, setLoginError] = useState(false);
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

  const handleLogin = (e, username, password) => {
    e.preventDefault();

    const user = users.find((user) => user.username === username && user.email === password);

    user ? navigate('/feeds') : setLoginError(true);
  };

  return (
    <div>
      <Login handleLogin={handleLogin} loginError={loginError} />
    </div>
  );
}

export default LoginPage;
