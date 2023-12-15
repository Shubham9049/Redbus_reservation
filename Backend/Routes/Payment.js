// const { ObjectId } = require("mongodb");
const { getDb } = require("../config/db");
const stripe = require("stripe")(
  "sk_test_51ON9x4SAOdIw0ELHleZbMWM5ousKR7hQwowBrmB3OzYShfEM9M8Jmpdz18N8J6WpFyPtLKgZPssfFx00TJy5n67R00sBeneIbw"
);

const payment = require("express").Router();

let db;
payment.post("/api/create-checkout-session", async (req, res) => {
  const { busOwnerId, seats } = req.body;
  try {
    const busDetails = await fetchBusDetails(busOwnerId);
    if (!busDetails) {
      throw new Error("Bus details not found");
    }
    const totalFare = calculateTotalFare(busDetails.busFare, seats.length);
    // Create a checkout session with the total fare
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "INR", // Replace with your currency
            product_data: {
              name: "Bus Fare", // Replace with your product name
            },
            unit_amount: totalFare * 100, // Stripe uses cents, so multiply by 100
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success", // Replace with your success URL
      cancel_url: "http://localhost:3000/cancel", // Replace with your cancel URL
    });
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({ error: "Error creating checkout session" });
  }
});

async function fetchBusDetails(busOwnerId) {
  try {
    const response = await fetch(
      `http://localhost:5000/red/buslist/`
    );
    if (!response.ok) {
        if (response.status === 404) {
          // Handle 404 (Not Found) appropriately
          return null;
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }

    const busDetails = await response.json();
    const selectedBus = busDetails.find((bus) => bus.busOwnerID === parseInt(busOwnerId));
    return selectedBus;
  } catch (error) {
    console.error("Error fetching bus details:", error.message);
    // Handle error fetching bus details
    return null;
  }
}
function calculateTotalFare(busFare, numSeats) {
  return busFare * numSeats;
}

module.exports = { payment };
