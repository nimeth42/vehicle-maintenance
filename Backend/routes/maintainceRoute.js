const express = require("express");
const route = express.Router();
//controller
const maintainceController = require("../controller/maintanceController");
route.post("/addMiantainceDetails", maintainceController.addMaintanceDetails);
route.post("/viewMaintaince", maintainceController.viewMaintanceDetails);


module.exports = route;


