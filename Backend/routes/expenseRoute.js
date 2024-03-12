// expenseRoute.js
const express = require('express');
const route = express.Router();
const expenseController = require('../controller/expenseController');

const Expense = require('../expenseModel'); // for pieChart the expense route has been located

route.post('/api/expenses', expenseController.createExpense);

// Route to fetch data for pie chart
route.get('/expenses', async (req, res) => {
  try {
    // Retrieve data from the database to display the data in the pieChart according to the set data
    const expenses = await Expense.find().select(
      'selectedExpenseType totalCost',
    );

    // Format data for the pie chart
    const formattedData = expenses.map(expense => ({
      key: expense.selectedExpenseType,
      value: expense.totalCost,
    }));

    // Send data as response
    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({error: 'Internal server error'});
  }
});

module.exports = route;
