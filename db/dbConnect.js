const mongoose = require("mongoose");

const dbConnect = async (URI_MONGO) => {
  await mongoose.connect(URI_MONGO);
  return;
};

module.exports = dbConnect;
