import React, { useState } from 'react';
import { sendApiRequest } from '../../../../library/requests';
import { sendAuthenticationRequest } from '../../../../library/Identity/authentication';
import './createAccountHero.css'; // Scoped styles

const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const signupData = { username, password, email };

    await sendApiRequest(
      'POST',
      '/signup',
      async () => {
        console.log('Successfully created account');
        await sendAuthenticationRequest(
          username,
          password,
          () => (window.location.href = '/index.html'),
          (error) => setMessage(`Login failed: ${error}`)
        );
      },
      signupData,
      (error) => {
        setMessage(`Error: ${error}`);
        console.log('Error creating account: ', error);
      }
    );
  };

  return (
    <section className="hero">
      <div className="create-account-container">
        <h1>Welcome!</h1>
        <p>Please create your account</p>

        <form onSubmit={handleSubmit}>
          <div className="create-account-form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="create-account-form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="create-account-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {message && <p id="result-message">{message}</p>}

          <button type="submit" className="create-account-button">
            Create account
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateAccount;
