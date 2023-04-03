const express = require("express");
const app = express();
const TicketModel  = require("../models/ticketModel");
const TIcketService = require("../services/ticketService");

app.post("/bookings", TicketModel.bookingTicket);

app.get("/status/bus/:bus_id/seat/:seat_number", TIcketService.ticketStatus);

app.get("/openseats/:busId", TIcketService.openTicket);

app.get("/closedseats/:busId", TIcketService.closedTicket);

module.exports = app;
