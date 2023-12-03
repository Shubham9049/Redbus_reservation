import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Body.css";
import Middle from './Middle';

function Body() {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [suggestionsFrom, setSuggestionsFrom] = useState([]);
  const [suggestionsTo, setSuggestionsTo] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch location suggestions when the component mounts
    fetchLocationSuggestions(''); // Initial fetch with empty query
  },[]);

const fetchLocationSuggestions=async ()=>{
  try {
    const response= await fetch(`http://localhost:5000/red/city`)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data =await response.json()
   

    setLocationData(data)

  } catch (error) {
    console.error('Error fetching location suggestions:', error);
  }
}

const handleInputChange = (input, setSuggestions) => {
  setSuggestions([]);
  if (input.trim().length >= 2) {
    const stateSuggestions = locationData
      .filter((location) =>
        location.state.toLowerCase().includes(input.toLowerCase())
      )
      .map((location) => location.state);

    const districtSuggestions = locationData
      .flatMap((location) => location.districts)
      .filter((district) => district.toLowerCase().includes(input.toLowerCase()));

    setSuggestions([...stateSuggestions, ...districtSuggestions]);
  }
};


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/red/books?from=${fromLocation}&to=${toLocation}&date=${journeyDate}`
      );
      if (!response) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }else{
        window.alert("Data fetched successfully")
        navigate(`/bus/${fromLocation}/${toLocation}/${journeyDate}`);
      }
      const data = await response.json();
      console.log("API Response in Body:", data);
      setFromLocation("");
      setToLocation("");
      setJourneyDate("");
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    // Perform actions with form data (e.g., send API request, update state, etc.)
    // console.log("From Location:", fromLocation);
    // console.log("To Location:", toLocation);
    // console.log("Journey Date:", journeyDate);

    // Reset form fields after submission (if needed)
  };
  return (
    <>
    
      <div className="main">
        <form onSubmit={handleFormSubmit}>
          <label>
            From:
            <input
              type="text"
              placeholder="From"
              value={fromLocation}
              onChange={(e) => {
                setFromLocation(e.target.value);
                handleInputChange(e.target.value, setSuggestionsFrom);
              }}
            />
            {suggestionsFrom.length > 0 && (
              <ul>
                {suggestionsFrom.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setFromLocation(suggestion);
                      setSuggestionsFrom([]);
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </label>

          <label>
            To:
            <input
              type="text"
              placeholder="To"
              value={toLocation}
              onChange={(e) =>{ 
                setToLocation(e.target.value);
                handleInputChange(e.target.value, setSuggestionsTo);
              }}
            />
             {suggestionsTo.length > 0 && (
              <ul>
                {suggestionsTo.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setToLocation(suggestion);
                      setSuggestionsTo([]);
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
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
      <Middle />
    </>
  );
}

export default Body;
