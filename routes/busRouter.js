const express = require("express");
const app = express();
const BusModel = require("../models/busModel");
const BusService = require("../services/busService");

app.post("/buses", BusModel.busCreation);

app.get("/buses/:busid", BusService.findBus);

module.exports = app;
