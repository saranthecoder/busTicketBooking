const express = require("express");
const app = express();
const resetController = require("../service/resetServer");

app.post("/admin/reset", async (req, res) => {
  try {
    console.log("Reseting the seat booking...");
    const result = await resetController.ResetServer();
    if(!result){
        res.status(404).json({error:"Error in Reseting..!!"});
        return ;
    }
    res.status(200).json({ message: "Server reset successful" });
    console.log("Server reset successful");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = app;
