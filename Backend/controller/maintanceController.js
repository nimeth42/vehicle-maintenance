const multer = require('multer');
const cloudinary = require("../utils/cloudenary");
const Maintenance = require("../models/maintanceModel");
const User = require("../models/userModel");

const upload = require("../middleware/multer");


// imageTagValue is True => image display
// "              " False => doesnt display display


exports.addMaintanceDetails = (req, res, next) => {
   
};

exports.viewMaintanceDetails = (req, res, next) => {


}