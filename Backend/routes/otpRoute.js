const express = require("express");
const route = express.Router();


const otpController  = require("../controller/otpController");
route.post("/otpSend",otpController.otpSend);
route.post("/otpCheck",otpController.otpCheck);

module.exports= route;