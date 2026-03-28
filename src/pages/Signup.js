import React, { useState } from 'react';
import axios from 'axios';

function Signup({ setAuth }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSignup = async() => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}register/`, {
                    username,
                    password,
                }
            );
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            setAuth(true);
        } catch (error) {
            console.error(error.response?.data);
            alert('Signup failed');
        }
    };
    return ( 
        <div>
        <h2> Signup </h2>
        <input 
        className="border p-2 rounded w-full"
        type="text"
        placeholder = "Username"
        autoComplete="off"
        onChange = {
            (e) => setUsername(e.target.value) }
        /> 
        <input
          className="border p-2 rounded w-full" 
         type = "password"
         autoComplete="off"
         placeholder = "Password"
         onChange = {
            (e) => setPassword(e.target.value) }
        /> 
        <button  className="bg-blue-500 py-3 px-4 my-1 py-2 text-white rounded" onClick = { handleSignup } > Signup </button> 
        </div>
    );
}

export default Signup;