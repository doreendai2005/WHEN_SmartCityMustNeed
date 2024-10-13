import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles.css';  // Assuming styles are placed in styles.css
import { Route, Routes, useNavigate } from 'react-router-dom';   // React Router imports
import LoginPage from './LoginPage';  // Import the correct LoginPage
import SignUpPage from './SignUpPage';  // Import the corrected SignUpPage

// Setup moment.js localizer for react-big-calendar
const localizer = momentLocalizer(moment);

function App() {
  const [events, setEvents] = useState([]);  // Store calendar events
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Track if the user is authenticated
  const navigate = useNavigate();  // React Router hook for navigation

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
        console.error("Unauthorized, redirecting to login.");
        setIsAuthenticated(false);  // Not authenticated yet
        navigate('/login');  // Redirect to login if not authenticated
      } else {
        return response.json();
      }
    })
    .then(data => {
      if (data) {
        console.log("Events data:", data);  // Log the fetched events
        const formattedEvents = data.map(event => ({
          title: event.summary || 'No Title',
          start: new Date(event.start.dateTime || event.start.date),
          end: new Date(event.end.dateTime || event.end.date),
        }));
        setEvents(formattedEvents);  // Store the formatted events in state
        setIsAuthenticated(true);  // Set authenticated state to true after successful fetch
      }
    })
    .catch(error => console.error("Error fetching events:", error));
  }, [navigate]);  // Added `navigate` as a dependency to handle redirection

  // Return the React Router structure
  return (
      <Routes>
        <Route path="/" element={isAuthenticated ? <CalendarPage events={events} /> : <LoginPage handleGoogleLogin={handleGoogleLogin} />} />
        <Route path="/login" element={<LoginPage handleGoogleLogin={handleGoogleLogin} />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
  );
}

// Calendar page component
function CalendarPage({ events }) {
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
