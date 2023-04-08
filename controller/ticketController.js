const express = require("express");
const app = express();
const TicketService = require("../service/tickerServer");

// Booking ticket
app.post("/bookings", async (req, res) => {
  try {
    console.log("Booking a seat for User...");
    const user_id = req.body.user_id;
    const { bus_id, seat_number } = req.body;

    //checking the user is present or not
    const user = await TicketService.userValid(user_id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    //checking bus is there or not
    const bus = await TicketService.busValid(bus_id);
    if (!bus) {
      res.status(404).json({ error: "Bus not found" });
      return;
    }

    //Checking the seat is in bus or not
    const seat = await TicketService.seatnoValid(bus, seat_number);
    if (!seat) {
      res.status(404).json({ error: "Seat number available upto 40 only...!" });
      return;
    }

    if (!seat.is_available) {
      res.status(400).json({ error: "Seat is already booked" });
      return;
    }

    const valid = await TicketService.seatValid(user, user_id, bus, bus_id, seat,seat_number);
    if (!valid) {
      res.status(501).json({ error: "Unkown error in booing..!" });
      return;
    }

    console.log("The seat is succesfully booked");
    res.json({ success: "The seat is succesfully booked " });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Bus ticket status

app.get("/status/bus/:bus_id/seat/:seat_number", async (req, res) => {
  try {
    console.log("Getting the status of the ticket...");
    const busId = req.params.bus_id;
    const seatNumber = req.params.seat_number;
    //res.json({ seatno: seatNumber });

    // Find the bus with the specified ID
    const bus = await TicketService.busValid(busId);

    // If the bus is not found, return a 404 Not Found response
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // Find the seat with the specified seat number

    const seat = await TicketService.seatnoValid(bus, seatNumber);

    // If the seat is not found, return a 404 Not Found response
    if (!seat) {
      return res.status(404).json({ error: "Seat number available upto 40 only...!" });
    }

    // Return the status of the seat
    res.json({ status: seat.is_available ? "available" : "booked" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//open ticket
app.get("/openseats/:busId", async (req, res) => {
  try {
    console.log("Checking for open seats...");
    const busId = req.params.busId;
    const bus = await TicketService.busValid(busId);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const openSeats = await TicketService.OpenSeat(bus);

    res.json(openSeats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//closed ticket
app.get("/closedseats/:busId", async (req, res) => {
  try {
    console.log("Checking for closed seats...");
    const busId = req.params.busId;
    const bus = await TicketService.busValid(busId);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const closedSeats = await TicketService.CloseSeat(bus);

    res.json(closedSeats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;
