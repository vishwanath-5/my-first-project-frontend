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
        className="border p-2 rounded w-full"
        type="text"
        placeholder="Username"
        autoComplete="off"
        onChange={(e) => setUsername(e.target.value)}
      />{' '}
      <input
        className="border p-2 rounded w-full"
        type="password"
        placeholder="Password"
        autoComplete="off"
        onChange={(e) => setPassword(e.target.value)}
      />{' '}
      <button  className="bg-blue-500 py-3 px-4 my-1 py-2 text-white rounded" onClick={handleLogin}> Login </button>{' '}
    </div>
  );
}
export default Login;
