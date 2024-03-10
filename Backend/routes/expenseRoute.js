// expenseRoute.js
const express = require("express");
const route = express.Router();
const expenseController = require("../controller/expenseController");

route.post("/api/expenses", expenseController.createExpense);

module.exports = route;
