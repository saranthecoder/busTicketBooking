const { User } = require("../schemas/SCHEMA");
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

module.exports = {
  findUser,
};
