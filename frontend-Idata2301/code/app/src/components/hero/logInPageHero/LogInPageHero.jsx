import React from 'react';
import './logInPageHero.css';

const LoginPageHero = () => {
  return (
    <section className="hero">
      <div className="login-hero-container">
        <h1>Welcome Back!</h1>
        <p>Please log in to continue</p>
        <form action="/login" method="post">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </section>
  );
};

export default LoginPageHero;