const { ObjectId } = require("mongodb");
const { getDb } = require("../config/db");

const client = require("express").Router();

let db;

// Get all result of booking
client.get("/api/bookings", async (req, res) => {
  const db = getDb();
  try {
    const collection = db.collection("bookings");
    const result = await collection.find({}).toArray();
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Handle booking request
client.post("/api/bookings", async (req, res) => {
  const { BusId, seat, date } = req.body;
  const db = getDb();
  try {
    // Fetch the bus details to determine the route
    const busDetails = await db
      .collection("books")
      .findOne({ busOwnerID: BusId });
    if (!busDetails) {
      return res.status(404).json({ error: "Bus not found" });
    }

    // Set the route based on bus details
    const route = `${busDetails.from} to ${busDetails.to}`;

    // Insert the booking into the database
    const result = await db.collection("bookings").insertOne({
      route,
      seat,
      date,
      // Other booking details...
    });

    console.log(`Booking inserted with ID: ${result.insertedId}`);

    res.status(200).json({ success: true, route });
  } catch (error) {
    console.error("Error processing booking:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = { client };
