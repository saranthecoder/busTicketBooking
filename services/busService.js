const { Bus } = require("../schemas/SCHEMA");
/*
  
  find bus by id
  
  */
const findBus = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.busid).populate(
      "seats.booked_by",
      "name email"
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
module.exports = {
  findBus,
};
