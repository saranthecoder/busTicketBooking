const express = require("express");
const app = express();
const UserModel = require("../models/userModel");
const UserService = require("../services/userService")

app.post("/users", UserModel.createUser);

app.get("/users/:id", UserService.findUser);

module.exports = app;
