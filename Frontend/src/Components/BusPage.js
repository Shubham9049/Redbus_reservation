import React, { useState, useEffect } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import "../styles/BusPage.css";
import { CiFilter } from "react-icons/ci";


const BusPage = () => {
  const { fromLocation, toLocation, journeyDate } = useParams();
  const [busData, setBusData] = useState([]);
  const [filteredBusData, setFilteredBusData] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  // const [dayFilter, setDayFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const navigate = useNavigate(); 


  useEffect(() => {
    // Fetch bus data based on the route and date
    const fetchBusData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/red/allbuses?from=${fromLocation}&to=${toLocation}&date=${journeyDate}`
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

  // Apply filters when dateFilter or timeFilter changes
  useEffect(() => {
    // Apply date, day, and time filters
    let filteredData = busData;
  
    if (dateFilter) {
      filteredData = filteredData.filter((bus) => {
        const busDate = new Date(dateFilter);
        const startDate = new Date(bus.schedule.startDate);
        const endDate = new Date(bus.schedule.endDate);
    
        console.log("Bus Date:", busDate);
        console.log("Schedule Start Date:", startDate);
        console.log("Schedule End Date:", endDate);
    
        // Check if the bus runs on the selected day
        const formattedBusDate = busDate.toLocaleDateString('en-US', { weekday: 'long' });
        console.log("Formatted Bus Date:", formattedBusDate);
    
        const runsOnSelectedDay = bus.schedule.daysOfWeek.includes(formattedBusDate);
        console.log("Runs on Selected Day:", runsOnSelectedDay);
    
        return busDate >= startDate && busDate <= endDate && runsOnSelectedDay;
      });
    }
  
  
    // if (dayFilter) {
    //   filteredData = filteredData.filter((bus) => {
    //     const selectedDay = dayFilter.toLowerCase()||dayFilter.toUpperCase();
    //     const daysOfWeek = Object.keys(bus.schedule.daysOfWeek);
  
    //     return daysOfWeek.includes(selectedDay) && bus.schedule[selectedDay];
    //   });
    // }
  
    if (timeFilter) {
      filteredData = filteredData.filter(
        (bus) => bus.startTime === timeFilter
      );
    }
  
    setFilteredBusData(filteredData);
  }, [busData, dateFilter, timeFilter]);
  console.log("Filtered Bus Data:", filteredBusData);

  const handleSeatSelection = (bus) => {
    // You can customize this function to handle seat selection logic
    console.log("Selected Bus:", bus);
    const selectedDate = dateFilter || journeyDate;
    // For simplicity, let's navigate to a seat selection page with bus_no as a parameter
    navigate(`/seat-selection/${bus.busOwnerID}/${selectedDate}`);
  };

  return (
    <>
      <div className="Bus-list">
        <div className="filer-item">
          <h2>FILTERS <CiFilter /></h2>
        <label>
         Search By Date:
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </label>
          <label>
          Search By Time:
            <input
              type="time"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            />
          </label>
        </div>
        <div className="list">
          <div>
            {/* <p>From: {fromLocation}</p>
      <p>To: {toLocation}</p>
      <p>Journey Date: {journeyDate}</p> */}

            {filteredBusData.length > 0 ? (
              <ul>
                {filteredBusData.map((bus, index) => (
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
                    <button onClick={() => handleSeatSelection(bus)}>Select Seat</button>
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
