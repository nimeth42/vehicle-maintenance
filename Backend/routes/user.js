const express = require("express");
const route = express.Router();
//controller
const userController = require("../controller/user");
const testController = require("../controller/test");
//middlewre
const auth=require("../middleware/auth");
route.post("/register", userController.driverRegister);
route.post("/login", userController.driverLogin);
route.post("/test",auth,testController.test)

module.exports = route;


