import React, { useState } from "react";
import {  useParams } from "react-router-dom";
import "../styles/SeatSelection.css"; // You can create a separate CSS file
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js';


const SeatSelection = () => {
  const { busOwnerID,date } = useParams(); // Change from bus_no to busOwnerID
  // const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");

     

  const handleSeatClick = (seat) => {
    // Toggle seat selection
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBooking = async () => {
    // Make a booking using the provided API
    const bookingData = {
      BusId: parseInt(busOwnerID), // Assuming busOwnerID is a number
      seat: selectedSeats.join(","),
      date: (date), // Replace with your logic to get the date
      name,
      age: parseInt(age), // Assuming age is a number
      Phone: parseInt(phone),
       // Assuming phone is a number
    };

    try {
      const response = await fetch("http://localhost:5000/red/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error("Booking failed");
      }else{
        alert("Booking successfully")
      }

      // Booking successful, proceed to payment
      // Create a session on the server to initiate the payment
      const sessionResponse=await fetch("http://localhost:5000/red/api/create-checkout-session",{
        method:"POST",
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify({busOwnerId: busOwnerID,
          seats: selectedSeats,})
        })
        
        const session = await sessionResponse.json();
        
        // Redirect to Stripe checkout page
        const stripe = await loadStripe("pk_test_51ON9x4SAOdIw0ELH4i3JjHHngq91K3KftB5NGPvXnvL8tvxMON0ppiZRaylTURlzLGmNZ1AzlRLairSkNKCGtX7b00AjBoSCaO");
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
  
        if (error) {
          console.error('Error redirecting to checkout:', error.message);
        }



    } catch (error) {
      console.error("Error making booking:", error.message);
      // Handle network error
    }
     
     
     
            
      
  };

  

  return (
    <div className="seat-selection-container">
      <div className="seat-grid">
      {/* <h2>Select Your Seats</h2> */}
        {/* Display your seat grid, use handleSeatClick to handle seat selection */}
        {/* Example: */}
        {Array.from({ length: 5 }, (_, row) => (
          <div key={row} className="seat-row">
            {Array.from({ length: 8 }, (_, seat) => (
              <div
                key={seat}
                className={`seat ${selectedSeats.includes(`${row}${seat}`) ? "selected" : ""}`}
                onClick={() => handleSeatClick(`${row}${seat}`)}
              >
                {`${row}${seat}`}
                <MdOutlineAirlineSeatReclineExtra />
              </div>
            ))}
          </div>
        ))}
      </div>
      {selectedSeats.length > 0 && (
        <>
          <div className="booking-form">
            <h2>Booking Form</h2>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
              Age:
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            </label>
            <label>
              Phone:
              <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>
            <button onClick={handleBooking}>Book Now</button>
          </div>
        </>
      )}
    </div>
  );
};

export default SeatSelection;