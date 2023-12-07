import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleLogin = async () => {
    const response = await fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
  
    const data = await response.json();
    setResponseMessage(data.message); // Set the response message

    // Handle the response accordingly (if needed)
    console.log(data);
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        Username:
        <input type="text" placeholder="USERNAME" onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" placeholder="PASSWORD" onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
      <br />
      <Link to="/register">Register</Link>

      {responseMessage && (
        <div>
          <h3>Response:</h3>
          <p>{responseMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
