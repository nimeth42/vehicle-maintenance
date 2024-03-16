const mongoose = require("mongoose");

const maintenanceSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, unique: true }, // Specify unique and auto options for _id
  plateNo: {
    type: String,
    required: [true, "Plate number is required"],
    validate: {
      validator: function(v) {
        return /^[A-Za-z0-9]+$/.test(v);
      },
      message: props => `${props.value} is not a valid plate number!`
    }
  },
  note:{
    type: String, 
    required: [true, "Note is required"], // Corrected typo and added an array
  },
  cost:{
    type: Number,
    default: 0, 
  },
  imageUrl:{
    type: String,
    required: [true, "Image is required"], // Corrected typo and added an array
  },
  imageValueCheck:{
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model("Maintenance", maintenanceSchema);
