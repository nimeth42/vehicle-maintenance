const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.driverRegister = (req, res, next) => {
  // Hash the provided password
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({
        status: "failed from register",
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
          status: "success from register",
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


