//Connection to mongodb server
const mongoose = require("mongoose");
const connection=()=>{
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

};
module.exports = connection;
