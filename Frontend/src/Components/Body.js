import React from 'react'
import { useState } from 'react'
import "../styles/Body.css"



function Body() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [journeyDate, setJourneyDate] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Perform actions with form data (e.g., send API request, update state, etc.)
    console.log('From Location:', fromLocation);
    console.log('To Location:', toLocation);
    console.log('Journey Date:', journeyDate);

    // Reset form fields after submission (if needed)
    setFromLocation('');
    setToLocation('');
    setJourneyDate('');
  };
  return (
    <>
    <div className="main">
    <form onSubmit={handleFormSubmit}>
      <label>
        From:
        <input
          type="text"
          value={fromLocation}
          onChange={(e) => setFromLocation(e.target.value)}
        />
      </label>

      <label>
        To:
        <input
          type="text"
          value={toLocation}
          onChange={(e) => setToLocation(e.target.value)}
        />
      </label>

      <label>
        Journey Date:
        <input
          type="date"
          value={journeyDate}
          onChange={(e) => setJourneyDate(e.target.value)}
        />
      </label>

      <button type="submit">Search</button>
    </form>
    </div>
    </>
  )
}

export default Body
