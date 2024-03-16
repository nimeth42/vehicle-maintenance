const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
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
    note: {
        type: String,
        required: [true, "Note is required"]
    },
    notificationFlag: {
        type: Boolean,
        default: true
    },
    maintanceId: {
        type: String, // Changed from Number to ObjectId
        ref: 'Maintenance', // References the Maintenance model
        required: [true, "Maintenance ID is required"]
    },
   
});

module.exports = mongoose.model("Notification", notificationSchema);

