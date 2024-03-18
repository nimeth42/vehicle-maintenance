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

    // Check if plateNo is provided in the request body
   if (!req.body.plateNo ) {
       return res.status(404).json({
           status: "error",
           comment: "plateNo is required",
           data: null,
       });
   }

   const plateNo = req.body.plateNo;

   // Find the user in the database based on the provided plateNo
   User.findOne({ plateNo: plateNo })
       .then(user => {
           // If user not found, return failed status
           if (!user) {
               return res.status(404).json({
                   status: "failed",
                   comment: "User not found",
                   data: null,
               });
           }

           // Retrieve maintenance records where imageValueCheck is true
           Maintenance.find({ plateNo: plateNo, imageValueCheck: true })
           .then(notifications => {
               return res.status(200).json({
                   status: "success",
                   comment: "Notifications retrieved successfully",
                   data: notifications,
               });
           })
           .catch(error => {
               console.error("Error retrieving notifications:", error);
               return res.status(500).json({
                   status: "error",
                   comment: "Failed to retrieve notifications",
                   data: null,
               });
           });
       })
       .catch(error => {
           console.error("Error finding user:", error);
           return res.status(500).json({
               status: "error",
               comment: "Failed to find user",
               data: null,
           });
        });
       
}

exports.deleteMaintanceDetials = (req, res, next) => {
    const id = req.body._id;

    Maintenance.findOneAndUpdate({ _id: id, imageValueCheck: true }, { imageValueCheck: false })
        .then(maintenance => {
            if (!maintenance) {
                return res.status(404).json({
                    status: "error",
                    comment: "Maintenance record not found or imageValueCheck is already false",
                    data: null,
                });
            }
            return res.status(200).json({
                status: "success",
                comment: "successfully delete",
                data: "",
            });
        })
        .catch(error => {
            console.error("Error updating maintenance record:", error);
            return res.status(500).json({
                status: "error",
                comment: "Failed to update maintenance record",
                data: null,
            });
        });
}
