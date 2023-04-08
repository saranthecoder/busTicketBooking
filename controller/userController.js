const Joi = require("joi");
const express = require("express");
const app = express();
// const UserService = require("../services/UserService");

const UserService = require("../service/userServer");

// Define a schema for the output data
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30),
});

/*

creating user

*/
app.post("/users", async (req, res) => {
  try {
    const result = schema.validate(req.body);
    if (result.error) {
      console.log(result.error);
      res.send(result.error.details[0].message);
      return;
    }
    const userCreate = req.body;
    const user = await UserService.userCreate(userCreate);
    //const user = await UserService.CreateUser(name , email , password);
    // res.json({ messege: "User is created Succesfully" });
    console.log("User is created Succesfully");
    // console.log(user);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// find user by id

app.get("/users/:id", async (req, res) => {
  try {
    //console.log("1");
    const userID = req.params.id;
    const user = await UserService.userFind(userID);
    //console.log("2");
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    //console.log("3");
    res.status(200).json(user);
    //console.log("4")
  } catch (err) {
    //console.log("5")
    res.status(400).json({ error: err.message });
  }
});

module.exports = app;
