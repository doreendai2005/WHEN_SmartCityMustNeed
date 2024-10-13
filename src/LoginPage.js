import React from 'react';
import './styles.css';  // Link to your CSS file

const LoginPage = () => {
  return (
    <div className="container">
      <div className="logo">
        <img id="clock" src="/assets/logo_.svg" alt="Clock Icon" className="logo-icon" />
        <img id="heading" src="/assets/WHEN__.svg" alt="when??" className="logo-icon" />
      </div>
      
      <div className="login-section">
        <div className="form-container">
          <h2>Login</h2>
          <form>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
          <p className="signup-text">New to WHEN?? <a href="#">Sign up</a></p>
        </div>
        
        <div className="divider"></div>

        <div className="social-login">
          <button className="social-btn facebook">Sign In with Facebook</button>
          <button className="social-btn google">Sign In with Google</button>
          <button className="social-btn apple">Sign In with Apple</button>
          <button className="social-btn microsoft">Sign In with Microsoft</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;