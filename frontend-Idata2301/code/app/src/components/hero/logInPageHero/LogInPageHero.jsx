import React, { useState } from 'react';
import './logInPageHero.css';
import { sendAuthenticationRequest } from '../../../library/Identity/authentication'; // Adjust the import path as needed

const LoginPageHero = ({ onNavClick }) => {

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
    <section className="hero">
      <div className="login-hero-container">
        <h1>Welcome Back!</h1>
        <p>Please log in to continue</p>
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label className="sr-only" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

          </div>
          <div className="form-group">
            <label className="sr-only" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {message && <p id="result-message" style={{ color: 'red' }}>{message}</p>} {/* Display error message here */}



          <button type="submit">Log In</button>
        </form>
        
        <a id="create-account-link" href="#" onClick={() => onNavClick("create-account")}>Dont have an account? Create one!</a>

      </div>

    </section>
  );
};

export default LoginPageHero;