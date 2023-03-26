const express = require("express");
const app = express();
const { Seat, Bus, User } = require("./modelSchema");
const Joi = require("joi");

// Define a schema for the output data
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30),
});

/*

creating user

*/

const createUser = async (req, res) => {
  try {
    const result = schema.validate(req.body);
    if (result.error) {
      console.log(result.error);
      res.send(result.error.details[0].message);
      return;
    }

    const user = await User.create(req.body);
    res.json({ messege: "User is created Succesfully" });
    console.log("User is created Succesfully");
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/*

bus creation

*/
const busCreation = async (req, res) => {
  try {
    const bus = await Bus.create(req.body);
    res.json({ messege: "Bus is ready..." });
    console.log("Bus is ready...");
    res.json(bus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/*

find bus by id

*/
const findBus = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.busid).populate(
      "seats.booked_by"
    );

    if (!bus) {
      res.status(404).json({ error: "Bus not found" });
      return;
    }
    console.log("Geting details of the Bus");
    res.json(bus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/*

find users by id

*/
const findUser = async (req, res) => {
  try {
    const userby = await User.findById(req.params.id).populate(
      "bookings.seat_number"
    );

    if (!userby) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    console.log("Getting details of the User");

    res.json(userby);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/*

booking the seat for user

*/
const bookingTicket = async (req, res) => {
  try {
    console.log("Booking a seat for User...");
    const { user_id, bus_id, seat_number } = req.body;

    //checking the user is present or not
    const user = await User.findById(user_id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    //checking bus is there or not
    const bus = await Bus.findById(bus_id);
    if (!bus) {
      res.status(404).json({ error: "Bus not found" });
      return;
    }

    //Checking the seat is in bus or not
    const seat = bus.seats.find((s) => s.seat_number === seat_number);
    /*
        this code is useful when you need to retrieve a specific seat from an array of seats
        based on a particular property, such as the seat number.
    */
    if (!seat) {
      res.status(404).json({ error: "Seat not found" });
      return;
    }

    if (!seat.is_available) {
      res.status(400).json({ error: "Seat is already booked" });
      return;
    }

    seat.is_available = false;
    seat.booked_by = user_id;

    bus.markModified("seats"); // Mongoose function used to save the changes in seats present in bus
    await bus.save();

    user.bookings.push({ bus_id, seat_number });
    await user.save();
    console.log("The seat is succesfully booked");
    res.json({ success: "The seat is succesfully booked " });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

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

/*

Additional API for admin to reset the server (opens up all the tickets)

*/
const reset = async (req, res) => {
  try {
    console.log("Reseting the seat booking..!!!");
    // Set all seats in all buses to available and remove booked_by field
    await Bus.updateMany(
      {},
      { $set: { "seats.$[].is_available": true, "seats.$[].booked_by": null } }
    );

    // Remove all user bookings
    await User.updateMany({}, { $set: { bookings: [] } });

    res.json({ message: "Server reset successful" });
    console.log("Server reset successful");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createUser,
  busCreation,
  findBus,
  findUser,
  bookingTicket,
  ticketStatus,
  openTicket,
  closedTicket,
  reset,
};
