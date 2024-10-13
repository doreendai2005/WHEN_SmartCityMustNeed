import React from 'react';
import { useNavigate } from 'react-router-dom';  // React Router hook for navigation

const LoginPage = ({ handleGoogleLogin }) => {
  const navigate = useNavigate();  // Initialize the useNavigate hook

  const handleSignUpClick = () => {
    navigate('/signup');  // Redirect to the sign-up page
  };

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
          <p className="signup-text">
            New to WHEN?? <button onClick={handleSignUpClick} className="signup-link">Sign up</button>
          </p>
        </div>

        <div className="divider"></div>

        <div className="social-login">
          <button className="social-btn facebook">Sign In with Facebook</button>
          <button className="social-btn google" onClick={handleGoogleLogin}>Sign In with Google</button>
          <button className="social-btn apple">Sign In with Apple</button>
          <button className="social-btn microsoft">Sign In with Microsoft</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
