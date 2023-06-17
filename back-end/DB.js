const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const Connection = async () => {
  const URL = process.env.DATABASE.replace("<password>", process.env.PASSWORD);
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting with the database ", error);
  }
};

module.exports = Connection;
