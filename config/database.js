const mongoose = require("mongoose");

const dbconnection = () =>
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });

module.exports = dbconnection;
