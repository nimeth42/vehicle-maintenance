const express = require("express");
const route = express.Router();
//controller
const grageUserTagController = require("../controller/grageUserTagController");
const grageUserUserController = require("../controller/grageUserController");

route.post("/grageUserTag", grageUserTagController.grageUserTag);
route.post("/grageUserTagRemove", grageUserTagController.grageUserTagRemove);
route.post("/grageRegister",grageUserUserController.grageRegister);
route.post("/grageLogin",grageUserUserController.grageRegisterLogin);


module.exports = route;
