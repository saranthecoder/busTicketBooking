const { Bus } = require("../schema/schemaBooking");

const busCreation = async (bus) => {
  const result = await Bus.create(bus);
  return result;
};

const busDetails = async (busID) => {
  const result = await Bus.findById(busID).populate(
    "seats.booked_by",
    "name email"
  );
  return result;
};

module.exports = {
  busCreation,
  busDetails,
};
