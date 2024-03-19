const User = require("../models/userModel");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

let storedOTP = null; // this is used identify the sended otp  

// Function to generate a random integer within a specific range
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


// exports.otpSend = (req, res, next) => {


//     email = req.body.email;
//     plateNo = req.body.plateNo;

//     if (!email || !plateNo) {
//         return res.status(400).json({

//           status: "failed",
//           comment: "Failed to save userEmail and plate number are required",
//           data: null,           
//           });
//     }


//     const randomNumber = getRandomInt(1000, 10000); // Generates a random integer between 1000 (inclusive) and 10000 (exclusive)
//     console.log(randomNumber);

//     const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: "drivelanka2024@gmail.com", 
//             pass: "icsc zllz cndd bdsg" 
//         },
//         tls: {
//             rejectUnauthorized: false 
//         }
//     });

//     // Email content
//     const mailOptions = {
//         from: "drivelanka2024@gmail.com", 
//         to: email, 
//         subject: "Drive Lanka OTP ",
//         text: `Your OTP is ${randomNumber}. This is only valid 2 minutes` // Use template string to include randomNumber
//     };

//     // // Send email
//     transporter.sendMail(mailOptions, function(error, info) {
//         if (error) {
//             console.error("Error occurred:", error.message);
//             return res.status(500).json({
//                 status: "failed",
//                 comment: "Failed to send email",
//                 data: null
//             });
//         } else {
//             console.log("Email sent successfully!");
//             console.log("Message ID:", info.messageId);
//             console.log("Preview URL:", nodemailer.getTestMessageUrl(info)); // Preview URL if you're using a test account
           

//     //         User.findOneAndUpdate(
//     //             { email: email, plateNo: plateNo }, // Search criteria
//     //             { $set: { storedOTP: randomNumber } }, // Update storedOTP
//     //             { new: true, upsert: true } // Options: return updated document, and create if not exists
//     //           )
//     //           .then(updatedUser => {
//     //             // return res.status(200).json({
//     //             //     status: "success ",
//     //             //     comment: "Successfully send otp ",
//     //             //     data: null,
            
//     //             //      } );



                
                
//     //             setTimeout(() => {
//     //                 // Delete the OTP
//     //                 User.findOneAndDelete({ email: email, plateNo: plateNo, storedOTP: randomNumber })
//     //                     .then(deletedOTP => {
//     //                         console.log("OTP deleted after 2 minutes:", deletedOTP);
//     //                     })
//     //                     .catch(error => {
//     //                         console.error("Failed to delete OTP:", error);
//     //                     });
//     //             }, 2* 60 * 1000); // 2 minutes in milliseconds

//     //             return res.status(200).json({
//     //                 status: "success ",
//     //                 comment: "Success update ",
//     //                 data: randomNumber,

//     //                 } );




                
//     //           })
//     //           .catch(error => {
//     //             return res.status(500).json({
//     //                 status: "failed ",
//     //                 comment: "Failed to send otp",
//     //                 data: null,        
//     //                 });
//     //           });
//     //     }
//     // });

 
//     // storedOTP = randomNumber;

   

//     // return res.status(200).json({
//     //     status: "success from register",
//     //     comment: "Success",
//     //     data: randomNumber,
//     //     data1: email,
//     //   });

//      // Find the user by email and plate number

// //************************************************************************************** */

// //   User.findOneAndUpdate(
// //     { email: email, plateNo: plateNo }, // Search criteria
// //     { $set: { storedOTP: randomNumber } }, // Update storedOTP
// //     { new: true, upsert: true } // Options: return updated document, and create if not exists
// //   )
// //   .then(updatedUser => {

// //     setTimeout(() => {
// //         // Delete the OTP
// //         User.findOneAndDelete({ email: email, plateNo: plateNo, storedOTP: randomNumber })
// //             .then(deletedOTP => {
// //                 console.log("OTP deleted after 2 minutes:", deletedOTP);
// //             })
// //             .catch(error => {
// //                 console.error("Failed to delete OTP:", error);
// //             });
// //     }, 1* 60 * 1000); // 2 minutes in milliseconds

// //     return res.status(200).json({
// //         status: "success ",
// //         comment: "Success update ",
// //         data: randomNumber,

// //          } );
// //   })
// //   .catch(error => {
// //     return res.status(500).json({
// //         status: "failed ",
// //         comment: "Failed to otp",
// //         data: null,        
// //         });
// //   });



// //****************************************** */




// User.findOneAndUpdate(
//     { email: email, plateNo: plateNo }, // Search criteria
//     { $set: { storedOTP: randomNumber } }, // Update storedOTP
//     { new: true, upsert: true } // Options: return updated document, and create if not exists
// )
// .then(updatedUser => {

//     setTimeout(() => {
//         // Update the storedOTP value to null after 1 minute
//         User.findOneAndUpdate(
//             { email: email, plateNo: plateNo, storedOTP: randomNumber },
//             { $set: { storedOTP: null } },
//             { new: true }
//         )
//         .then(updatedUser => {
//             console.log("StoredOTP value updated to null after 1 minute:", updatedUser);
//         })
//         .catch(error => {
//             console.error("Failed to update storedOTP value:", error);
//         });
//     }, 1 * 60 * 1000); // 1 minute

//     return res.status(200).json({
//         status: "success",
//         comment: "Success update",
//         data: randomNumber,
//     });
// })
// .catch(error => {
//     return res.status(500).json({
//         status: "failed",
//         comment: "Failed to otp",
//         data: null,
//     });
// });


// };


// // exports.otpCheck = (req, res, next) => {

// //         email = req.body.email;
// //         plateNo = req.body.plateNo; 

// //         console.log(storedOTP);

// //         otpValue = req.body.otpValue;


// //         User.findOne({ plateNo: plateNo ,email:email, storedOTP:otpValue}).

// //         then({
// //          return res.status(200).json({
// //                 status: "success",
// //                 comment: "Success(coreect otp)",
// //                 data: email + '   ' + plateNo,
                
// //             });
// //         }).catch({
// //              return res.status(500).json({
// //                 status: "failed",
// //                 comment: "failed(incorect otp)",
// //                 data: "",
                
// //             });
// //         });

// //         // if(storedOTP == otpValue){

            
// //         //     console.log("Same");


// //         //     return res.status(200).json({
// //         //         status: "success",
// //         //         comment: "Success(coreect otp)",
// //         //         data: email + '   ' + plateNo,
                
// //         //     });

// //         // }else{

// //         //     console.log("Wrong");

// //         //     return res.status(500).json({
// //         //         status: "failed",
// //         //         comment: "failed(incorect otp)",
// //         //         data: "",
                
// //         //     });

// //         // }

       

// // }
exports.otpCheck = (req, res, next) => {
    const { email, plateNo, otpValue } = req.body;

    // Validate request body
    if (!email || !plateNo || !otpValue) {
        return res.status(400).json({
            status: "failed",
            comment: "Bad request. Missing required fields.",
            data: ""
        });
    }

    // Find user by email, plateNo, and check if OTP matches
    User.findOne({ plateNo: plateNo, email: email, storedOTP: otpValue })
        .then(user => {
            if (user) {
                // OTP is correct
                return res.status(200).json({
                    status: "success",
                    comment: "Success (correct OTP)",
                    data: ""
                });
            } else {
                // OTP is incorrect or user not found
                return res.status(500).json({
                    status: "failed",
                    comment: "Failed (incorrect OTP or user not found)",
                    data: ""
                });
            }
        })
        .catch(error => {
            // Error occurred during database query
            return res.status(500).json({
                status: "failed",
                comment: "Failed (error during OTP check)",
                data: ""
            });
        });
};


exports.otpSend = (req, res, next) => {
    const email = req.body.email;
    const plateNo = req.body.plateNo;

    if (!email || !plateNo) {
        return res.status(400).json({
            status: "failed",
            comment: "Failed to save userEmail and plate number are required",
            data: null,
        });
    }

    // Check if user exists with the provided email and plate number
    User.findOne({ email: email, plateNo: plateNo })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    status: "failed",
                    comment: "User not found",
                    data: null,
                });
            }

            const randomNumber = getRandomInt(1000, 10000); // Generates a random integer between 1000 (inclusive) and 10000 (exclusive)
            console.log(randomNumber);

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "drivelanka2024@gmail.com",
                    pass: "icsc zllz cndd bdsg"
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            const mailOptions = {
                from: "drivelanka2024@gmail.com",
                to: email,
                subject: "Drive Lanka OTP ",
                text: `Your OTP is ${randomNumber}. This is only valid for 2 minutes` // Use template string to include randomNumber
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.error("Error occurred:", error.message);
                    return res.status(500).json({
                        status: "failed",
                        comment: "Failed to send email",
                        data: null
                    });
                } else {
                    console.log("Email sent successfully!");
                    console.log("Message ID:", info.messageId);
                 

                    // Save OTP in the database
                    User.findOneAndUpdate(
                        { email: email, plateNo: plateNo },
                        { $set: { storedOTP: randomNumber } },
                        { new: true, upsert: true }
                    )
                    .then(updatedUser => {
                        // Schedule to set storedOTP to null after 2 minutes
                        setTimeout(() => {
                            User.findOneAndUpdate(
                                { email: email, plateNo: plateNo, storedOTP: randomNumber },
                                { $set: { storedOTP: null } },
                                { new: true }
                            )
                            .then(updatedUser => {
                                console.log("StoredOTP value updated to null after 2 minutes:", updatedUser);
                            })
                            .catch(error => {
                                console.error("Failed to update storedOTP value:", error);
                            });
                        }, 4 * 60 * 1000); // 2 minutes

                        return res.status(200).json({
                            status: "success",
                            comment: "Success update",
                            data: randomNumber,
                        });
                    })
                    .catch(error => {
                        return res.status(500).json({
                            status: "failed",
                            comment: "Failed to save OTP",
                            data: null,
                        });
                    });
                }
            });
        })
        .catch(error => {
            return res.status(500).json({
                status: "failed",
                comment: "Error occurred while finding user",
                data: null,
            });
        });
};
