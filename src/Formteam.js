import React from 'react';
import './styles.css'; // Make sure the CSS file is in the same directory

const Formteam =() => {
  console.log('Formteam component rendered');  // Debugging log
  return (
    <div className="container">
      {/* Logo Section */}
      <div className="logo">
        <img id="clock" src="assets/clock-icon.png" alt="Clock Icon" className="logo-icon" />
        <img id="header" src="assets/logo.svg" alt="when??" className="logo-icon" />
      </div>

      {/* Buttons Section */}
      <div className="button-container">
        <button className="main-button" onClick={() => alert('Form a Teamspace clicked!')}>
          Form a Teamspace
        </button>
        <button className="main-button" onClick={() => alert('Schedule a onetime event clicked!')}>
          Schedule a onetime event
        </button>
      </div>
    </div>
  );
}

export default Formteam;
