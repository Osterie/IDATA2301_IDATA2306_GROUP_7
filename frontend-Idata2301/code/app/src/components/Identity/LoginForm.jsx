import React, { useState } from 'react';
import { sendAuthenticationRequest } from '../../library/Identity/authentication'; // Adjust the import path as needed

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default HTML form submission behavior
    setMessage('');

    sendAuthenticationRequest(username, password,
      () => {
        setMessage('Login successful! Redirecting...');
        // Redirect to the main page or perform any other action
        window.location.href = '/index.html'; // Adjust the URL as needed
      },
      (error) => {
        setMessage(`Login failed: ${error}`);
      }
    );

    // Login with backend 
  };

  return (
    <main>
      <p>This is a "styled" login form. No fancy styles, but it shows the concept of using "your own" login form.</p>
      <form onSubmit={handleSubmit}>
        <h2>Sign in</h2>

        <label className="sr-only" htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="sr-only" htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {message && <p id="result-message">{message}</p>}

        <button type="submit" id="login-form-button">Sign in</button>
      </form>
    </main>
  );
};

export default LoginForm;