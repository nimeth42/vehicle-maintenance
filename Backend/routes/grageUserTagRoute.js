const express = require("express");
const route = express.Router();
//controller
const grageUserTagController = require("../controller/grageUserTagController");
route.post("/grageUserTag", grageUserTagController.grageUserTag);
module.exports = route;
