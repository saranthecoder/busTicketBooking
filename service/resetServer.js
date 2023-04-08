const resetDB = require("../DB_layer/reserDB");

const ResetServer = async () => {
  const server = await resetDB.resetServer();
  return server;
};

module.exports = {
  ResetServer,
};
