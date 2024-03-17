//controller for expenses

// expenseController.js
const Expense = require('../models/expenseModel');

exports.createExpense = async (req, res) => {
  try {
    const {date, odometer, note, totalCost, selectedExpenseType} = req.body;

    //check if any required field is empty
    if(!date || !odometer || !note || !totalCost || !selectedExpenseType){
      return res.status(400).json({success:false,error: 'All fields are required'});
    }
    const expense = new Expense({
      date,
      odometer,
      note,
      totalCost,
      selectedExpenseType,
    });

    await expense.save(); // save the expense

    res.status(201).json({success: true, data: expense});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, error: 'Server Error'});
  }
};
