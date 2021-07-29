import { Router } from "express";
const routeExpense : Router = Router();
import { exprensesController } from '../controllers/expenseController';
import { JWThelpers } from '../helpers/JWThelpers';

routeExpense.post('/expense',
    JWThelpers.authorizationToken, 
    exprensesController.createExpense
    );


export default module.exports = routeExpense;
