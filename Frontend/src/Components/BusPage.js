import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/BusPage.css";

const BusPage = () => {
  const { fromLocation, toLocation, journeyDate } = useParams();
  const [busData, setBusData] = useState([]);

  useEffect(() => {
    // Fetch bus data based on the route and date
    const fetchBusData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/red/books?from=${fromLocation}&to=${toLocation}&date=${journeyDate}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("From Location:", fromLocation);
        console.log("To Location:", toLocation);
        console.log("Journey Date:", journeyDate);
        const data = await response.json();
        console.log("API Response in BusPage:", data);
        setBusData(data); // Assuming your API response is an array of bus data
      } catch (error) {
        console.error("Error fetching bus data:", error);
      }
    };

    fetchBusData();
  }, [fromLocation, toLocation, journeyDate]);

  return (
    <>
      <div className="Bus-list">
        <div className="filer-item"></div>
        <div className="list">
          <div>
            {/* <p>From: {fromLocation}</p>
      <p>To: {toLocation}</p>
      <p>Journey Date: {journeyDate}</p> */}

            {busData.length > 0 ? (
              <ul>
                {busData.map((bus, index) => (
                    <li key={index}>
                     <div className="name">
                     <p className="heading">{bus.busName}</p>
                   <span> <p>{bus.category}</p></span>
                     </div>
                    <div className="start-time">
                    <p className="heading">Date: {bus.date}</p>
                    <span><p>From: {bus.from}</p>
                    <p>Start Time: {bus.startTime}</p></span>
                    
                    </div>
                    <div className="end-time">
                    <p className="heading">To: {bus.to}</p>
                    <span><p>End Time: {bus.EndTime}</p></span>
                    
                    </div>
                    <div className="bus-no">
                    <p className="heading">Bus Number: {bus.bus_no}</p>
                    <span><p>Bus Owner ID: {bus.busOwnerID}</p></span>
                   </div>
                    
                    <div className="fare">
                    <p className="heading">Bus Fare: {bus.busFare}</p>
                    
                    {/* <p>Amenities List: {bus.animeties_list.join(", ")}</p> */}
                    <span><p>Seat Booked: {bus.SeatBooked.join(", ")}</p></span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bus data available for the selected route and date.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BusPage;
