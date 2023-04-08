const { User } = require("../schema/schemaBooking");

// create user

const CreateUser = async (userCreate) => {
  const result = await User.create(userCreate);
  return result;
};

//find users by id
const findUser = async (userID) => {
  const result = await User.findById(userID).populate("bookings.seat_number");
  return result;
};

module.exports = {
  CreateUser,
  findUser,
};
