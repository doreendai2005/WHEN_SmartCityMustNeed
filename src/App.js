import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles.css';  // Assuming styles are placed in styles.css

// Setup moment.js localizer for react-big-calendar
const localizer = momentLocalizer(moment);

function App() {
  const [events, setEvents] = useState([]);  // Store calendar events
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Track if the user is authenticated

  const handleGoogleLogin = () => {
    // Redirect to Flask's Google OAuth login route
    window.location.href = "http://127.0.0.1:5000/login";
  };

  // Fetch Google Calendar events from Flask backend after successful login
  useEffect(() => {
    fetch("http://127.0.0.1:5000/calendar", {
      method: 'GET',
      credentials: 'include',  // Include cookies to handle session
    })
    .then(response => {
      if (response.status === 401) {
        // If unauthorized, redirect to login
        console.error("Unauthorized, redirecting to login.");
        setIsAuthenticated(false);  // Not authenticated yet
      } else {
        return response.json();
      }
    })
    .then(data => {
      if (data) {
        console.log("Events data:", data);  // Log the fetched events

        // Transform the fetched events to match the format required by react-big-calendar
        const formattedEvents = data.map(event => ({
          title: event.summary || 'No Title',
          start: new Date(event.start.dateTime || event.start.date),  // Handle both dateTime and all-day events
          end: new Date(event.end.dateTime || event.end.date),        // Handle both dateTime and all-day events
        }));
        setEvents(formattedEvents);  // Store the formatted events in state
        setIsAuthenticated(true);  // Set authenticated state to true after successful fetch
      }
    })
    .catch(error => console.error("Error fetching events:", error));
  }, []);  // Empty array ensures this runs once on component mount

  // If user is not authenticated, show the login page
  if (!isAuthenticated) {
    return (
      <div className="container">
        <div className="logo">
          <img src="../public/assets/logo_.svg" alt="Clock Icon" className="logo-icon" />
          <h1>WHEN??</h1>
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
            <button className="social-btn google" onClick={handleGoogleLogin}>Sign In with Google</button>
          </div>
        </div>
      </div>
    );
  }

  // If user is authenticated, show the calendar page
  return (
    <div className="App">
      <h1>Google Calendar Events</h1>
      {events.length > 0 ? (
        <MyCalendar events={events} />
      ) : (
        <p>Loading events...</p>
      )}
    </div>
  );
}

// Calendar component using react-big-calendar
function MyCalendar({ events }) {
  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default App;
