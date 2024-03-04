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

const multer = require('multer');
const upload = multer({dest:'uploads/'})

exports.grageUserTag = (req, res, next) => {




}