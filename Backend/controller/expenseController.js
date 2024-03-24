
//expenseController
const mongoose = require("mongoose"); // importing the mongoose library


const Expense = require('../models/expenseModel');
const User = require('../models/userModel');
exports.createExpense = async (req, res) => {    // function to create the Expense 
    try {
      const { date, odometer, note, totalCost, selectedExpenseType, plateNo } = req.body; //Destructing propoerties from the request body
      console.log("Received date:", date);
  
      // Parse the date string into a Date object
      const [day, month, year] = date.split('-');
      const parsedDate = new Date('${year}-${month}-${day}'); //Creating a new Date Object
  
      // Check if any required field is empty
      if (!parsedDate || !odometer || !note || !totalCost || !selectedExpenseType || !plateNo) {
        return res.status(400).json({
          status: false,
          comment: 'All fields are required', //The comment to be displayed if any required field is empty
          data: null
        });
      }
  
      // Check if the plateNo exists in the User model
      const user = await User.findOne({ plateNo });//Querying the database to find a user based on the provided plate number
      if (!user) {
        return res.status(400).json({
          status: false,
          comment: 'Invalid plate number', // Comment to indicate a invalid plate number
          data: null
        });
      }
  
      // Create the expense
      const expense = new Expense({
        date: parsedDate,
        odometer,
        note,
        totalCost,
        selectedExpenseType,
        plateNo,
      });
  
      await expense.save(); // Save the expense
  
      res.status(201).json({   // Sending JSON response with success code to indicate successful insertion
        status: "success",
        comment: "Successfully inserted",
        data: expense 
      });
    } catch (error) {  // catching any errors and sending JSON response with appropriate error message
      console.error(error);
      res.status(500).json({ 
        status: false,
        comment: 'Server Error',
        data: null
      });
    }
  };
  

exports.getExpense = async (req, res) => {  //Function to handle the retrieval of expenses
    try {
      const startDate = req.body.startDate;
      const plateNo = req.body.plateNo;
  
      // Check if plateNo exists in the User model
      const user = await User.findOne({ plateNo });
      if (!user) {
        return res.status(404).json({ success: 'failed', comment: 'User not found' }); //if the plateNo does not exists , it returns this JSON response
      }
  
      // Calculate today's date
      const endDate = new Date();
  
      // Aggregate pipeline to calculate total cost for all expenses between startDate and endDate
      const totalExpense = await Expense.aggregate([
        { $match: { plateNo, date: { $gte: new Date(startDate), $lte: endDate } } }, // Match expenses for the given plateNo within the date range
        { $group: { _id: null, totalCost: { $sum: "$totalCost" } } } // Calculate the total cost for all expenses within the date range
      ]);
  
      if (totalExpense.length === 0) {
        return res.status(404).json({ success: 'failed', comment: 'No expenses found' });//If no expenses found return this JSON response
      }
  
      const totalCost = totalExpense[0].totalCost; //Retrieving total cost of expenses from the totalExpense array
  
      // Aggregate pipeline to calculate cost for each expense category between startDate and endDate
      const expenseCosts = await Expense.aggregate([
        { $match: { plateNo, date: { $gte: new Date(startDate), $lte: endDate } } }, // Match expenses for the given plateNo within the date range
        {
          $group: {//Grouping expenses by the selectedExpenseType and calculating the total cost for each category
            _id: "$selectedExpenseType", // Group by selectedExpenseType
            totalCost: { $sum: "$totalCost" } // Calculate the total cost for each category within the date range
          }
        },
        {
          $project: {//projecting the results to reshape the data 
            _id: 0,
            selectedExpenseType: "$_id",
            totalCost: 1
          }
        }
      ]);
  
      // Create an object to store the final result
      const result = {};
  
      // Loop through all possible expense types and add the cost for each category to the result
      ['fuel', 'insurance', 'repair', 'miscellaneous', 'other'].forEach(type => {
        // Find the cost for the current type in the expenseCosts array
        const expenseItem = expenseCosts.find(item => item.selectedExpenseType === type);
        // If the expense data exists, add it to the result, otherwise add 0
        result[type] = expenseItem ? expenseItem.totalCost : 0;
      });
  
      // Add the total cost and percentage for each category to the result
      result.totalCost = totalCost;
      result.percentage = {};
      // Loop through all expense types and calculate the percentage
      ['fuel', 'insurance', 'repair', 'miscellaneous', 'other'].forEach(type => {
        result.percentage[type] = totalCost === 0 ? 0 : Math.round((result[type] / totalCost) * 100);
      });
  
      res.status(200).json({ success: 'sucess', comment:"sucessfully ",data: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: 'failed',comment: 'Server Error',data:null });
    }

  

  }

