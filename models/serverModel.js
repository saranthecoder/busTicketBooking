const { Bus, User } = require("../schemas/SCHEMA");
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
  reset,
};
