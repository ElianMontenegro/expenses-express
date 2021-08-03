import { Router } from "express";
const routeExpense : Router = Router();
import { exprensesController } from '../controllers/expenseController';
import { JWThelpers } from '../helpers/JWThelpers';

routeExpense.post('/expense',
    JWThelpers.authorizationAccessToken, 
    exprensesController.createExpense
    );

routeExpense.get('/expense',
    exprensesController.getAllExpenses
    );

routeExpense.get('/expense/:id',
    JWThelpers.authorizationAccessToken, 
    exprensesController.getExpensesByUser
    );

routeExpense.delete('/expense/:id',
    JWThelpers.authorizationAccessToken,
    exprensesController.deleteExpense
    );

routeExpense.put('/expense/:id',
    JWThelpers.authorizationAccessToken,
    exprensesController.updateExpense
    );

export default module.exports = routeExpense;
