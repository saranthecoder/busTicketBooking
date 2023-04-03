const { Bus } = require("../schemas/SCHEMA");

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

module.exports = {
  busCreation,
};

