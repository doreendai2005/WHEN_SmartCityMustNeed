import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from Flask backend
    fetch('http://127.0.0.1:5000/')
      .then(response => response.json())  // Parse the response as JSON
      .then(data => {
        console.log(data);  // Log the data to check the response
        setData(data.message);  // Set the data to state
      })
      .catch(error => console.error('Error fetching data:', error));  // Handle errors
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flask-React Connection</h1>
        {/* Display the data */}
        {data ? <p>{data}</p> : <p>Loading...</p>}
      </header>
    </div>
  );
}

export default App;
