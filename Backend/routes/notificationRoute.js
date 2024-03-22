const express = require("express");
const route = express.Router();
const auth = require("../middleware/auth");

//controller
const notificationController = require("../controller/notificationController");
// route.post("/displayAll", auth,notificationController.displayAllNotifications);
route.post("/displayAll",notificationController.displayAllNotifications);

route.post("/viewOne", notificationController.viewOne);
route.post("/deleteOne", notificationController.deleteOne);
route.post("/viewAll", notificationController.viewAll);
route.post("/accept", notificationController.acceptNotification);
route.post("/notificationIdentifiy",notificationController.notificationIdentify);


module.exports = route;


