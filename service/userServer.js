const userDB = require("../DB_layer/userDB");

const userCreate = async (userCreate) => {
  const server = await userDB.CreateUser(userCreate);
  return server;
};

const userFind = async (userID) => {
  const server = await userDB.findUser(userID);
  return server;
};

module.exports = {
  userCreate,
  userFind,
};
