import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup moment.js localizer for react-big-calendar
const localizer = momentLocalizer(moment);

function App() {
  const [data, setData] = useState(null);
  const [events, setEvents] = useState([]);  // Ensure this starts as an empty array

  const handleLogin = () => {
    window.location.href = "http://127.0.0.1:5000/login";  // Redirect to Flask login route
  };

  useEffect(() => {
  // Fetch Google Calendar events from Flask backend after successful login
  fetch("http://127.0.0.1:5000/calendar", {
    method: 'GET',
    credentials: 'include',  // Make sure cookies are included to handle session
  })
  .then(response => {
    if (response.status === 401) {
      console.error("Unauthorized, redirecting to login.");
      window.location.href = "http://127.0.0.1:5000/login";  // Redirect to login
    } else {
      return response.json();
    }
  })
  .then(data => {
    console.log("Events data:", data);  // Log the fetched events for debugging

    // Transform the fetched events to match the format required by react-big-calendar
    const formattedEvents = data.map(event => ({
      title: event.summary || 'No Title',
      start: new Date(event.start.dateTime || event.start.date),  // Handle both dateTime and all-day events
      end: new Date(event.end.dateTime || event.end.date),        // Handle both dateTime and all-day events
    }));
    setEvents(formattedEvents);  // Store the formatted events in state
  })
  .catch(error => console.error("Error fetching events:", error));
}, []);  // Empty array ensures this runs once on component mount

 
  return (
    <div className="App">
      <h1>Google Calendar Integration</h1>

      {/* Button to login using Google */}
      <button onClick={handleLogin}>Login with Google</button>

      {/* Display the basic message fetched from Flask */}
      <p>{data}</p>

      {/* Display the calendar using react-big-calendar */}
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
