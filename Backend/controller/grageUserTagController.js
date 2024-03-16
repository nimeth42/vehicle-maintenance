<<<<<<< HEAD
const multer = require('multer');
const cloudinary = require("../utils/cloudenary");
const Maintenance = require("../models/maintanceModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");

const upload = require("../middleware/multer");


// imageTagValue is True => image display
// "              " False => doesnt display display
exports.grageUserTag = (req, res, next) => {
    console.log(req.body)
    console.log(req.body.data);
    try {
        // Use multer middleware to upload image
        upload.single("image")(req, res, async function (err) {
            if (err) {
                return res.status(400).json({
                    status: "error",
                    comment: "Error uploading image"
                });
            }

            // Check if the uploaded file is an image
            if (!req.file || !req.file.mimetype.startsWith('image')) {
                return res.status(400).json({
                    status: "error",
                    comment: "Uploaded file is not an image"
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
                        comment: "User not found with the provided plate number"
                    });
                }

                // If multer upload successful, now upload to Cloudinary
                cloudinary.uploader.upload(req.file.path, { folder: "DriveLanka" }, async function (error, result) {
                    if (error) {
                        return res.status(500).json({
                            status: "error",
                            comment: "Error uploading image to Cloudinary"
                        });
                    }
                    console.log("waatha")
                    console.log(result.secure_url);
                    console.log("note: "+additionalData.note);
                    try {
                        // Create a new Maintenance object and save it to the database
                        const maintenance = new Maintenance({
                            plateNo: plateNo,
                            note: additionalData.note,
                            cost: additionalData.cost,
                            imageUrl: result.secure_url,
                            imageValueCheck: false,
                        });
                        const savedMaintenance = await maintenance.save(); // Save the maintenance object and get the saved document
                        const maintenanceId = savedMaintenance._id; // Get the _id of the saved maintenance object

                        // If Maintenance save successful
                        // Return success response
                        console.log("hello "+ maintenanceId)
                        try {
                            // create notification object
                            const notification = new Notification({
                                plateNo: plateNo,
                                note: additionalData.note,
                                notificationFlag: false,
                                maintanceId: maintenanceId // Assign the maintenanceId to the notification
                            });
                            await notification.save();

                            return res.status(200).json({
                                status: "success",
                                comment: "Maintenance data saved successfully",
                                imageUrl: result.secure_url // Uploaded image URL
                            });
                        } catch (error) {
                            console.error("Error saving notification:", error);
                            console.log("1")

                            return res.status(500).json({
                                status: "error",
                                comment: "Error saving notification"
                            });
                        }


                    } catch (error) {
                        console.log("2")
                        return res.status(500).json({
                            status: "error",
                            comment: error.message
                        });
                    }
                });
            } catch (error) {
                return res.status(500).json({
                    status: "error",
                    comment: error.message
                });
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            comment: error.message
        });
    }

    // return res.status(200).json({
    //     status: 'failed',
    //     comment: 'Missing imageValueCheck in request body',
    //     data: null
    // });
};
=======
// const AWS = require('aws-sdk');

// // Configure AWS with your access key ID, secret access key, and region
// AWS.config.update({
//   accessKeyId: 'AKIAU6GD2JKHLGGGSZHN',
//   secretAccessKey: 'ihHWFcom1HNDfRmTGdk6Bbnym7QL5c7Ntqcg0bqQ',
//   region: 'Regious: Asia Pacific (Mumbai) ap-south-1'
// });

// exports.grageUserTag = (req, res, next) => {
//   // Assuming the image is sent as a file with the field name 'image'
//   if (!req.files || !req.files.image) {
//     return res.status(400).json({
//       status: 'faield',
//       comment: 'failed'
//     });
//   }
  
  
//   const uploadedImage = req.files.image;

//   // Create an instance of the S3 service
//   const s3 = new AWS.S3();//

//   // Set the parameters for the S3 object
//   const params = {
//     Bucket: 'arn:aws:s3:::drivecar', //
//     Key: uploadedImage.name, // Set the key or filename as per your requirement
//     Body: uploadedImage.data
//   };/////

//   // Upload the image to S3
//   s3.upload(params, (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({
//         status: 'error',
//         message: 'Error uploading image to AWS S3'
//       });
//     }

//     // If successful, return the URL of the uploaded image
//     return res.status(200).json({
//       status: 'success',
//       message: 'Image uploaded successfully to AWS S3',
//       data: {
//         imageUrl: data.Location
//       }//
//     });
//   });
// };

// const fileUpload = require("express-fileupload");
// var AWS = require('aws-sdk');


// exports.grageUserTag = (req, res, next) => {

// AWS.config.update({
//   accessKeyId: 'AKIAU6GD2JKHLGGGSZHN',
//   secretAccessKey: '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',
//   region: 'Regious: Asia Pacific (Mumbai) ap-south-1'
// });
  
// const fileContent = Buffer.from(req.file.data.data,'binary');

//   const params = {
//     Bucket: 'arn:aws:s3:::drivecar', //
//     Key: req.files.data.name, // Set the key or filename as per your requirement
//     Body: fileContent,
//   };/////

//   s3.upload(params, (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({
//         status: 'error',
//         message: 'Error uploading image to AWS S3'
//       });
//     }
  
//     // If successful, return the URL of the uploaded image
//     return res.status(200).json({
//       status: 'success',
//       message: 'Image uploaded successfully to AWS S3',
//       data: {
//         imageUrl: data.Location
//       }
//     });
//   });
// }

// const multer = require('multer');
// const upload = multer({dest:'uploads/'})

// exports.grageUserTag = (req, res, next) => {
>>>>>>> 3189642a87c2021dd149e0dad24840dd2bc17fec



exports.grageUserTagRemove = (req, res, next) => {

<<<<<<< HEAD
};

  
=======
// }
>>>>>>> 3189642a87c2021dd149e0dad24840dd2bc17fec
