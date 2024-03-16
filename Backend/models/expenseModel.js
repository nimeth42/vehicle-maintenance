// expenseModel.js for vehicleExpenses
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  odometer: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  selectedExpenseType: {
    type: String,
    enum: ['fuel', 'insurance', 'repair', 'miscellaneous', 'other'],
    required: true,
  },
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
