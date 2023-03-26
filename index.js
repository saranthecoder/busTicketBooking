const mongoose = require("mongoose");
const express = require("express");
const app = express();
const controller = require("./controller");

//Connection to mongodb server
mongoose
  .connect("mongodb://127.0.0.1/busticketbooking", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase connected...");
  })

  .catch((err) => {
    console.log("ERROR in connecting !" + err);
  });

app.use(express.json());
app.use(controller);

app.listen(3000, () => {
  console.log("Server is running ...");
});
