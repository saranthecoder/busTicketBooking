const express = require("express");
const app = express();
const UserController = require("./routers");

app.post("/users", UserController.createUser);

app.post("/buses", UserController.busCreation);

app.get("/buses/:busid", UserController.findBus);

app.get("/users/:id", UserController.findUser);

app.post("/bookings", UserController.bookingTicket);

app.get("/status/bus/:bus_id/seat/:seat_number", UserController.ticketStatus);

app.get("/openseats/:busId", UserController.openTicket);

app.get("/closedseats/:busId", UserController.closedTicket);

app.post("/admin/reset", UserController.reset);

module.exports = app;
