const { Bus, User } = require("../schema/schemaBooking");

const resetServer = async()=>{
    // Set all seats in all buses to available and remove booked_by field
    const result1 = await Bus.updateMany(
        {},
        { $set: { "seats.$[].is_available": true, "seats.$[].booked_by": null } }
      );
  
      // Remove all user bookings
      const result2 = await User.updateMany({}, { $set: { bookings: [] } });
      return {result1, result2};
}

module.exports ={
    resetServer,
} 