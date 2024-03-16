const express = require("express");
const route = express.Router();
//controller
const notificationController = require("../controller/notificationController");
route.post("/displayAll", notificationController.displayAllNotifications);
route.post("/viewOne", notificationController.viewOne);
route.post("/deleteOne", notificationController.deleteOne);
route.post("/viewAll", notificationController.viewAll);
route.post("/accept", notificationController.acceptNotification);


module.exports = route;


