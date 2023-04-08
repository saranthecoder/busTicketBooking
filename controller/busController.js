const express = require("express");
const app = express();
const BusServices = require("../service/busServer");

//Bus Creation
app.post("/buses", async (req, res) => {
  try {
    const bus = await req.body;
    const result = await BusServices.createBus(bus);
    // res.json({ messege: "Bus is ready..." });
    console.log("Bus is ready...");
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Bus Details
app.get("/buses/:busid", async (req, res) => {
  try {
    const busID =req.params.busid;
    const bus = await BusServices.detailsBus(busID);
    if (!bus) {
      res.status(404).json({ error: "Bus not found" });
      return;
    }
    console.log("Geting details of the Bus");
    res.json(bus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = app;
