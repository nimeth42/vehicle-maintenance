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
    .connect("mongodb+srv://devops663:cS3VonfdF2PYkn1O@cluster0.tdev0vt.mongodb.net/vehicle_maintance?retryWrites=true&w=majority")
    .then(() => {
      console.log("Connected mongo to database-auth");
    })
    .catch(() => {
      console.log("Connection failed!");
    });
};

module.exports = connect;
