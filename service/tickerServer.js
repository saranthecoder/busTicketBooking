const ticketDb = require("../DB_layer/ticketDB");
// Validating the user
const userValid = async (user_id) => {
  const server = await ticketDb.validatingUser(user_id);
  return server;
};

//Validating the Bus
const busValid = async (bus_id) => {
  const server = await ticketDb.validatingBus(bus_id);
  return server;
};

// Seat number Validating
const seatnoValid = async (bus, seat_number) => {
  if (seat_number < 0 || 40 < seat_number) {
    return false;
  }
  const server = await ticketDb.seatno(bus, seat_number);
  return server;
};

//Updating seat status
const seatValid = async (user, user_id, bus, bus_id, seat, seat_number) => {
  const server = await ticketDb.validatingSeat(
    user,
    user_id,
    bus,
    bus_id,
    seat,
    seat_number
  );
  return server;
};

const OpenSeat = async (bus) => {
  const server = await ticketDb.seatOpen(bus);
  return server;
};

const CloseSeat = async (bus) => {
  const server = await ticketDb.seatClose(bus);
  return server;
};
module.exports = {
  userValid,
  busValid,
  seatValid,
  seatnoValid,
  OpenSeat,
  CloseSeat,
};
