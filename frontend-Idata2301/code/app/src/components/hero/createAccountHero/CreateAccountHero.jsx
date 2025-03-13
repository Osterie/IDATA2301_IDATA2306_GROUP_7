import React from 'react';
import './createAccountHero.css';

const CreateAccountHero = () => {
  return (
<section className="hero">
    <div className="hero-container">
      <h1>Welcome To Flight Finder!</h1>
      <p>Please create an account!</p>
      <form action="/create-account" method="post">
        <div className="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required />
        </div>
        <div className="form-group">
            <label for="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" name="confirm-password" required />
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  </section>
  );
};

export default CreateAccountHero;