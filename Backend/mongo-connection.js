const mongoose = require("mongoose");

const connect = () => {
  //   mongoose
  //     .connect(
  //       "mongodb+srv://prakash:Admin123@cluster0.0z3jr.mongodb.net/prakash?retryWrites=true&w=majority"
  //     )
  //     .then(() => {
  //       console.log("Connected mongo to database-auth");
  //     })
  //     .catch(() => {
  //       console.log("Connection failed!");
  //     });
  mongoose
    .connect("mongodb://localhost:27017/vehicle_maintance")
    .then(() => {
      console.log("Connected mongo to database-auth");
    })
    .catch(() => {
      console.log("Connection failed!");
    });
};

module.exports = connect;
