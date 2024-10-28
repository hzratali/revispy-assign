const mongoose = require("mongoose");
const ConnectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
};
module.exports = ConnectToDatabase;
