const { Bus } = require("../schemas/SCHEMA");

/*

 Get ticket status by seat number and bus id

*/
const ticketStatus = async (req, res) => {
  try {
    console.log("Getting the status of the ticket...");
    const busId = req.params.bus_id;
    const seatNumber = req.params.seat_number;
    //res.json({ seatno: seatNumber });

    // Find the bus with the specified ID
    const bus = await Bus.findById(busId);

    // If the bus is not found, return a 404 Not Found response
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // Find the seat with the specified seat number

    const seat = await bus.seats.find((s) => s.seat_number == seatNumber);

    // If the seat is not found, return a 404 Not Found response
    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }

    // Return the status of the seat
    res.json({ status: seat.is_available ? "available" : "booked" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/*
  
  View all open tickets
  
  */
const openTicket = async (req, res) => {
  try {
    console.log("Checking for open seats...");
    const busId = req.params.busId;
    const bus = await Bus.findById(busId);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const openSeats = bus.seats.filter((seat) => seat.is_available);

    res.json(openSeats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/*
  
  View all closed tickets
  
  */
const closedTicket = async (req, res) => {
  try {
    console.log("Checking for closed seats...");
    const busId = req.params.busId;
    const bus = await Bus.findById(busId);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const closedSeats = bus.seats.filter((seat) => !seat.is_available);

    res.json(closedSeats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  ticketStatus,
  openTicket,
  closedTicket,
};
