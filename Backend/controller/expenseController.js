//controller for expenses

// expenseController.js
const Expense = require('../expenseModel');

exports.createExpense = async (req, res) => {
  try {
    const { date, odometer, note, totalCost, selectedExpenseType } = req.body;
    const expense = new Expense({
      date,
      odometer,
      note,
      totalCost,
      selectedExpenseType,
    });
    await expense.save();
    res.status(201).json({ success: true, data: expense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
