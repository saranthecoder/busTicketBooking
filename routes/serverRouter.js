const express = require("express");
const app = express();
const UserController = require("../models/serverModel");

app.post("/admin/reset", UserController.reset);

module.exports = app;
