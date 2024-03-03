const express = require("express");
const route = express.Router();
//controller
const userController = require("../controller/user");
route.post("/register", userController.driverRegister);
route.post("/login", userController.driverLogin);
module.exports = route;


