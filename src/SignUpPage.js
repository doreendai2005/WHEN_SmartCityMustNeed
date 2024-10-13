import React from 'react';
import { useNavigate } from 'react-router-dom';  // React Router hook for navigation

const SignUpPage = () => {  // Correctly rename this to SignUpPage
  const navigate = useNavigate();  // Initialize the useNavigate hook
  const handleLoginClick = () => {
        navigate('/login');  // Redirect back to the login page
      };
    

  return (
    <div className="container">
      <div className="logo">
        <img id="clock" src="/assets/logo_.svg" alt="Clock Icon" className="logo-icon" />
        <img id="heading" src="/assets/WHEN__.svg" alt="when??" className="logo-icon" />
      </div>

      <div className="signup-section">
        <div className="form-container">
          <h2>Sign Up</h2>
          <form>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Sign Up</button>
          </form>
          <p className="login-text">
            Already have an account? <button onClick={handleLoginClick} className="login-link">Login</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;  // Export SignUpPage correctly


 
  

