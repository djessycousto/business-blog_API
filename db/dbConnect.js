const mongoose = require("mongoose");

const dbConnect = async (URI_MONGO) => {
  try {
    await mongoose.connect(URI_MONGO);
    return;
  } catch (error) {
    console.log("db not connected ");
  }
};

module.exports = dbConnect;
