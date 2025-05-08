import React, { useState } from 'react';
import './logInPageHero.css';
import { sendAuthenticationRequest } from '../../../../library/Identity/authentication'; // Adjust the import path as needed

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
        <p>Log in here:</p>
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-links">
            <a href="#">Create new password?</a>
            <a href="#">Log in with SMS</a>
          </div>

          {message && <p id="result-message">{message}</p>}

          <button type="submit" className="primary-button">Log in</button>

          <div className="divider">
            <hr /><span>or</span><hr />
          </div>
        </form>
        
        <a id="create-account-link" href="#" onClick={() => onNavClick("create-account")}>If you dont have one, create one!</a>

      </div>

    </section>
  );
};

export default LoginPageHero;