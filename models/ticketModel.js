const { Bus, User } = require("../schemas/SCHEMA");

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


module.exports = {
  bookingTicket,
};
