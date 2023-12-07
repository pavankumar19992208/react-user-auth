import React, { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleRegister = async () => {
    const response = await fetch('http://127.0.0.1:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
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
      <h2>Register</h2>
      <label>
        Name:
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
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
      <button onClick={handleRegister}>Register</button>

      {responseMessage && (
        <div>
          <h3>Response:</h3>
          <p>{responseMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Register;
