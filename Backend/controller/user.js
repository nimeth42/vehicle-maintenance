const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const config=require("../config/config");

exports.driverRegister = (req, res, next) => {
  // Hash the provided password
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({
        status: "failed ",
        comment: "Failed to hash password",
        data: null,
      });
    }
    
    // Create a new User using hashed password
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      plateNo: req.body.plateNo,
      password: hash, // Store hashed password
      email: req.body.email,
    });

    // Save the new user to the database
    newUser.save()
      .then((response) => {
        
        console.log(response);

        return res.status(200).json({
          status: "success ",
          comment: "Success",
          data: null,
        });

      })
      .catch((error) => {
        console.error('Error saving user:', error);
        return res.status(500).json({
          status: "failed from register",
          comment: "Failed to save user",
          data: null,
        });
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
