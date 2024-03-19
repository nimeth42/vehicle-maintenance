const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const config=require("../config/config");

exports.driverRegister = (req, res, next) => {
  const plateNo = req.body.plateNo;
  const email = req.body.email;
  const password = req.body.password;

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: "failed",
      comment: "Invalid email address",
      data: null,
    });
  }

  // Validate password length
  if (password.length < 6) {
    return res.status(400).json({
      status: "failed",
      comment: "Password must be at least 6 characters long",
      data: null,
    });
  }

  // Check if the plateNo already exists in the database
  User.findOne({ plateNo: plateNo })
    .then((existingUser) => {
      if (existingUser) {
        // If a user with the same plateNo already exists, return an error
        return res.status(400).json({
          status: "failed",
          comment: "Plate number already registered",
          data: null,
        });
      } else {
        // If the plateNo is not found in the database, hash the password and proceed with registration
        bcrypt.hash(password, saltRounds, function(err, hash) {
          if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({
              status: "failed",
              comment: "Failed to hash password",
              data: null,
            });
          }
          
          // Create a new User using hashed password
          const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            plateNo: plateNo,
            password: hash, // Store hashed password
            email: email,
          });

          // Save the new user to the database
          newUser.save()
            .then(() => {
              return res.status(200).json({
                status: "success",
                comment: "Registration successful",
                data: null,
              });
            })
            .catch((error) => {
              console.error('Error saving user:', error);
              return res.status(500).json({
                status: "failed",
                comment: "Failed to save user",
                data: null,
              });
            });
        });
      }
    })
    .catch((error) => {
      console.error('Error checking existing user:', error);
      return res.status(500).json({
        status: "failed",
        comment: "Failed to check existing user",
        data: null,
      });
    });
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

  // Find the user  plateNo and email
  User.findOne({ plateNo: plateNo, email: email })
    .then(user => {
      // If user not foun return failed status
      if (!user) {
        console.log("cannot find user");
        return res.status(400).json({
          status: "failed",
          comment: "User not found",
          data: null,
        });
      }

      // Hash the new pswd
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
          return res.status(500).json({
            status: "failed",
            comment: "Failed to hash password",
            data: null,
          });
        }

        // Update the user's paswd with the hashed password
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


