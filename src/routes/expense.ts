import { Router } from "express";
const routeExpense : Router = Router();
import { exprensesController } from '../controllers/expenseController';
import { JWThelpers } from '../helpers/JWThelpers';

routeExpense.post('/expense',
    JWThelpers.authorizationToken, 
    exprensesController.createExpense
    );

routeExpense.get('/expense',
    exprensesController.getAllExpenses
    );

routeExpense.get('/expense/:id',
    JWThelpers.authorizationToken, 
    exprensesController.getExpensesByUser
    );

routeExpense.delete('/expense/:id',
    JWThelpers.authorizationToken,
    exprensesController.deleteExpense
    );

routeExpense.put('/expense/:id',
    JWThelpers.authorizationToken,
    exprensesController.updateExpense
    );

export default module.exports = routeExpense;
