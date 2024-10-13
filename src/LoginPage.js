import React from 'react';
import { useNavigate } from 'react-router-dom';  // React Router hook for navigation

const LoginPage = ({ handleGoogleLogin }) => {
  const navigate = useNavigate();  // Initialize the useNavigate hook

  const handleSignUpClick = () => {
    navigate('/signup');  // Redirect to the sign-up page
  };

  const handleFormteamClick = () => {
    navigate('/Formteam');  // Redirect to the sign-up page
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
            <button onClick={handleFormteamClick} type="submit">Login</button>
          </form>
          <p className="signup-text">
            New to WHEN?? <button onClick={handleSignUpClick} className="signup-link">Sign up</button>
          </p>
        </div>

        <div className="divider"></div>

        <div className="social-login">
          <button className="social-btn facebook">Sign in with Facebook</button>
          <button id="googlebutton" className="social-btn google" onClick={handleGoogleLogin}>
            <img src="/assets/googleicon.jpg" alt="google icon"/>
            Sign in with Google 
            </button>
          <button className="social-btn apple">Sign in with Apple</button>
          <button id="microbutton" className="social-btn microsoft">
            <img src="/assets/microicon.jpg" alt="microsoft icon"/>
            Sign in with Microsoft
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
