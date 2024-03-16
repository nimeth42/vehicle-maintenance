const mongoose = require("mongoose");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");


exports.displayAllNotifications = (req, res, next) => {
    // Check if plateNo is provided in the request body
    if (!req.body.plateNo) {
        return res.status(400).json({
            status: "error",
            comment: "plateNo is required in the request body",
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

            // Find all notifications for the user and sort them by createdAt field in descending order
            Notification.find({ plateNo: plateNo }).sort({ createdAt: -1 })
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
};



exports.viewOne = (req, res, next) => {
    


    // Check if plateNo and _id are provided in the request body
    if (!req.body.plateNo || !req.body._id) {
        return res.status(400).json({
            status: "error",
            comment: "plateNo and _id are required",
            data: null,
        });
    }

    const plateNo = req.body.plateNo;
    const _id = req.body._id;

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

            // Find the notification in the database based on the provided _id and plateNo
            Notification.findOneAndUpdate({ plateNo: plateNo, _id: _id }, { notificationFlag: true }, { new: true })
                .then(notification => {
                    if (!notification) {
                        return res.status(404).json({
                            status: "failed",
                            comment: "Notification not found",
                            data: null,
                        });
                    }

                    return res.status(200).json({
                        status: "success",
                        comment: "Notification retrieved and updated successfully",
                        data: notification,
                    });
                })
                .catch(error => {
                    console.error("Error updating notification:", error);
                    return res.status(500).json({
                        status: "error",
                        comment: "Failed to update notification",
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
};


exports.deleteOne = (req, res, next) => {
    // Check if plateNo and _id are provided in the request body
    if (!req.body.plateNo || !req.body._id) {
        return res.status(400).json({
            status: "error",
            comment: "plateNo and _id are required",
            data: null,
        });
    }

    const plateNo = req.body.plateNo;
    const _id = req.body._id;

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

            // Delete all notifications in the database based on the provided _id and plateNo
            Notification.deleteMany({ plateNo: plateNo, _id: _id })
                .then(result => {
                    if (result.deletedCount === 0) {
                        return res.status(404).json({
                            status: "failed",
                            comment: "No notifications found for the provided _id and plateNo",
                            data: null,
                        });
                    }

                    return res.status(200).json({
                        status: "success",
                        comment: "Notifications deleted successfully",
                        data: null,
                    });
                })
                .catch(error => {
                    console.error("Error deleting notifications:", error);
                    return res.status(500).json({
                        status: "error",
                        comment: "Failed to delete notifications",
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
};


exports.viewAll = (req, res, next) => {
    // Check if plateNo is provided in the request body
    if (!req.body.plateNo) {
        return res.status(400).json({
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

            // Update all notifications in the database based on the provided plateNo
            Notification.updateMany({ plateNo: plateNo }, { notificationFlag: true })
                .then(result => {
                    if (result.nModified === 0) {
                        return res.status(404).json({
                            status: "failed",
                            comment: "No notifications found for the provided plateNo",
                            data: null,
                        });
                    }

                    return res.status(200).json({
                        status: "success",
                        comment: "Notifications updated successfully",
                        data: null,
                    });
                })
                .catch(error => {
                    console.error("Error updating notifications:", error);
                    return res.status(500).json({
                        status: "error",
                        comment: "Failed to update notifications",
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
};


exports.acceptNotification = (req, res, next) => {
    if (!req.body.plateNo || !req.body._id) {
       return res.status(400).json({
           status: "error",
           comment: "plateNo and _id are required",
           data: null,
       });
   }

   const plateNo = req.body.plateNo;
   const _id = req.body._id;

    User.findOne({ plateNo: plateNo })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    status: "failed",
                    comment: "User not found",
                    data: null,
                });
            }

            Notification.findOneAndUpdate({ plateNo: plateNo, _id: _id }, { notificationFlag: true }, { new: true })
                .then(notification => {
                    if (!notification) {
                        return res.status(404).json({
                            status: "failed",
                            comment: "Notification not found",
                            data: null,
                        });
                    }

                    Maintenance.findOne({ _id })
                        .then(maintenanceRecord => {
                            if (maintenanceRecord) {
                                maintenanceRecord.imageValueCheck = true;

                                return maintenanceRecord.save()
                                    .then(updatedRecord => {
                                        return res.status(200).json({
                                            status: 'success',
                                            comment: 'Image value check updated successfully',
                                            data: null
                                        });
                                    })
                                    .catch(error => {
                                        console.error('Error updating maintenance record:', error);
                                        return res.status(500).json({
                                            status: 'failed',
                                            comment: 'Error updating maintenance record',
                                            data: null
                                        });
                                    });
                            } else {
                                return res.status(404).json({
                                    status: 'failed',
                                    comment: 'No maintenance record found for the provided _id',
                                    data: null
                                });
                            }
                        })
                        .catch(error => {
                            console.error('Error finding maintenance record:', error);
                            return res.status(500).json({
                                status: 'failed',
                                comment: 'Unknown error',
                                data: null
                            });
                        });
                })
                .catch(error => {
                    console.error("Error updating notification:", error);
                    return res.status(500).json({
                        status: "error",
                        comment: "Failed to update notification",
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
