import React, { useState } from 'react';
import axios from 'axios';

function Login({ setAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}login/`, {
        username,
        password,
      });
      localStorage.setItem('token', res.data.token);
      setAuth(true);
    } catch (error) {
      console.error(error);
      alert('Invalid credentials');
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        autoComplete="off"
        onChange={(e) => setUsername(e.target.value)}
      />{' '}
      <input
        type="password"
        placeholder="Password"
        autoComplete="off"
        onChange={(e) => setPassword(e.target.value)}
      />{' '}
      <button onClick={handleLogin}> Login </button>{' '}
    </div>
  );
}
export default Login;
