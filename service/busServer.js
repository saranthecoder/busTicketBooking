const busDB = require("../DB_layer/busDB");

const createBus = async (bus) => {
  const server = await busDB.busCreation(bus);
  return server;
};

const detailsBus = async (busID) => {
  const server = await busDB.busDetails(busID);
  return server;
};
module.exports = {
  createBus,
  detailsBus,
};
