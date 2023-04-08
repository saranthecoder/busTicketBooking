const { Bus, User } = require("../schema/schemaBooking");

const validatingUser = async (user_id) => {
  const result = await User.findById(user_id);
  return result;
};

const validatingBus = async (bus_id) => {
  const result = await Bus.findById(bus_id);
  return result;
};

const validatingSeat = async(user, user_id, bus, bus_id, seat,seat_number)=>{

    
    seat.is_available = false;
    seat.booked_by = user_id;

    bus.markModified("seats"); // Mongoose function used to save the changes in seats present in bus
    await bus.save();

    user.bookings.push({ bus_id, seat_number });
    await user.save();
    return true;

}

const seatno = async(bus, seat_number)=>{
     /*
          this code is useful when you need to retrieve a specific seat from an array of seats
          based on a particular property, such as the seat number.
    */
    const result =bus.seats.find((s) => s.seat_number == seat_number);
    return result;
}

const seatOpen = async(bus)=>{
  const result= bus.seats.filter((seat) => seat.is_available);
  return result;
}

const seatClose= async(bus)=>{
  const result= bus.seats.filter((seat) => !seat.is_available);
  return result;
}

module.exports = {
  validatingUser,
  validatingBus,
  validatingSeat,
  seatno,
  seatOpen,
  seatClose,
};
