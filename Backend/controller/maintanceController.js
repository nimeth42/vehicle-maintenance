const multer = require('multer');
const cloudinary = require("../utils/cloudenary");
const Maintenance = require("../models/maintanceModel");
const User = require("../models/userModel");

const upload = require("../middleware/multer");


// imageTagValue is True => image display
// "              " False => doesnt display display


exports.addMaintanceDetails = (req, res, next) => {
    console.log(req.body.data);
    try {
        // Use multer middleware to upload image
        upload.single("image")(req, res, async function (err) {
            if (err) {
                return res.status(400).json({
                    status: "error",
                    error: err.message
                });
            }

            // Check if the uploaded file is an image
            if (!req.file || !req.file.mimetype.startsWith('image')) {
                return res.status(400).json({
                    status: "error",
                    error: "Uploaded file is not an image"
                });
            }

            const additionalData = JSON.parse(req.body.data);
            console.log('Additional data:', additionalData);

            const plateNo = additionalData.plateNo;
            console.log("Plate number:", plateNo);

            // Check if the user exists in the database
            try {
                const user = await User.findOne({ plateNo: plateNo });
                if (!user) {
                    return res.status(404).json({
                        status: "error",
                        error: "User not found with the provided plate number"
                    });
                }

                // If multer upload successful, now upload to Cloudinary
                cloudinary.uploader.upload(req.file.path, { folder: "DriveLanka" }, async function (error, result) {
                    if (error) {
                        return res.status(500).json({
                            status: "error",
                            error: error.message
                        });
                    }

                    try {
                        // Create a new Maintenance object and save it to the database
                        const maintenance = new Maintenance({
                            plateNo: plateNo,
                            note: additionalData.note,
                            cost: additionalData.cost,
                            imageUrl: result.secure_url,
                            imageValueCheck: true,// set image value to,when user uploaed the image and auto matically display
                        });
                        await maintenance.save();

                        // If Maintenance save successful
                        // Return success response


                        return res.status(200).json({
                            status: "success",
                            comment: "Maintenance data saved successfully to database and cloud",
                            imageUrl: result.secure_url // Uploaded image URL
                        });

                       
                    } catch (error) {
                        return res.status(500).json({
                            status: "error",
                            error: error.message
                        });
                    }
                });
            } catch (error) {
                return res.status(500).json({
                    status: "error",
                    error: error.message
                });
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            error: error.message
        });
    }
};

exports.viewMaintanceDetails = (req, res, next) => {


}