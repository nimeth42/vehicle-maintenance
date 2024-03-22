const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const config=require("../config/config");

// Function to validate email format
const validateEmail = (email) => {
  // Regular expression to match email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};




exports.driverLogin = (req, res, next) => {
  const { plateNo, password,email } = req.body;
  

  // Find the user in the database based on the provided plateNo
  User.findOne({ plateNo: plateNo })
    .then(user => {
      // If user not found, return failed status
      if (!user) {
        console.log("canot find");
        return res.status(400).json({
          status: "failed",
          comment: "User not found",
          data: null,
        });
      }

      // Compare the provided password with the hashed password from the database
      bcrypt.compare(password, user.password, function(err, result) {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(300).json({
            status: "failed",
            comment: "Internal server error",
            data: null,
          });
        }

        // If passwords match, generate JWT token
        if (result) {
          // Generate JWT token with user's ID and plateNo as payload
          const token = jwt.sign({ userId: user._id, plateNo: user.plateNo }, config.userToken, { expiresIn: '1h' });
          // Send the token in the response
          return res.status(200).json({
            status: "success",
            comment: "Login successful",
            data:{plateNo:plateNo,email:email},
            token: token // Send the token in the response
          });
        } else {
          console.log("canot find 1");

          // If password doesn't match, return failed status
          return res.status(300).json({
            status: "failed",
            comment: "Incorrect password",
            data: null,
          });
        }
      });
    })
    .catch(error => {
      console.error('Error finding user:', error);
      return res.status(300).json({
        status: "failed",
        comment: "Internal server error",
        data: null,
      });
    });
};



exports.passwordChange = (req, res, next) => {
  const { plateNo, password, email } = req.body;

  // Check if any of the required fields are empty
  if (!plateNo || !password || !email) {
    return res.status(400).json({
      status: "failed",
      comment: "Plate number, password, and email are required fields.",
      data: null,
    });
  }
  
  // Validate email format using the validateEmail function
  if (!validateEmail(email)) {
    return res.status(400).json({
      status: "failed",
      comment: "Invalid email format.",
      data: null,
    });
  }
  
  // Further validation if needed...
  
  // Find the user by plate number and email
  User.findOne({ plateNo: plateNo, email: email })
    .then(user => {
      // If user not found, return failed status
      if (!user) {
        console.log("User not found");
        return res.status(400).json({
          status: "failed",
          comment: "User not found",
          data: null,
        });
      }
  
      // Hash the new password
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
          return res.status(500).json({
            status: "failed",
            comment: "Failed to hash password",
            data: null,
          });
        }
  
        // Update the user's password with the hashed password
        user.password = hash;
        user.save()
          .then(updatedUser => {
            console.log("Password updated successfully");
            return res.status(200).json({
              status: "success",
              comment: "Password updated successfully",
              data: null,
            });
          })
          .catch(error => {
            console.error('Error updating password:', error);
            return res.status(500).json({
              status: "failed",
              comment: "Failed to update password",
              data: null,
            });
          });
      });
    })
    .catch(error => {
      console.error('Error checking existing user:', error);
      return res.status(500).json({
        status: "failed",
        comment: "Failed to check existing user",
        data: null,
      });
    });
  
};


