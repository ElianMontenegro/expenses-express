"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routeExpense = express_1.Router();
const expenseController_1 = require("../controllers/expenseController");
const JWThelpers_1 = require("../helpers/JWThelpers");
routeExpense.post('/expense', JWThelpers_1.JWThelpers.authorizationAccessToken, expenseController_1.exprensesController.createExpense);
routeExpense.get('/expense', expenseController_1.exprensesController.getAllExpenses);
routeExpense.get('/expense/:id', JWThelpers_1.JWThelpers.authorizationAccessToken, expenseController_1.exprensesController.getExpensesByUser);
routeExpense.delete('/expense/:id', JWThelpers_1.JWThelpers.authorizationAccessToken, expenseController_1.exprensesController.deleteExpense);
routeExpense.put('/expense/:id', JWThelpers_1.JWThelpers.authorizationAccessToken, expenseController_1.exprensesController.updateExpense);
exports.default = module.exports = routeExpense;