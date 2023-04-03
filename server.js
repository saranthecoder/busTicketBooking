const express = require("express");
const app = express();

const busController = require("./routes/busRouter");
const ticketController = require("./routes/ticketsRouter");
const serverReset = require("./routes/serverRouter");
const userController = require("./routes/userRouter");
require("./utils/connection")();

app.use(express.json());
app.use(busController);
app.use(ticketController);
app.use(serverReset);
app.use(userController);

app.listen(3000, () => {
  console.log("Server is running ...");
});
