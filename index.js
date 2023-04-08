const express = require("express");
const app = express();
const userController = require("./controller/userController");
const ticketController = require("./controller/ticketController");
const busController = require("./controller/busController");
const serverReset = require("./controller/resetController")

const Connection = require("./utils/connection");
Connection();

app.use(express.json());
app.use(userController);
app.use(ticketController);
app.use(busController);
app.use(serverReset);

app.listen(3000, () => {
  console.log("Server is running ...");
});
