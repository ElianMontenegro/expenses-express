import { Request, Response } from "express";
import { ExpenseModel } from '../models/expense';

class ExprensesController {

    public async createExpense(req: Request ,res: Response) {
        const {  title, amount, category, user } = req.body;
        if(!(title || amount || category || user)){
            return res.status(400).json({
                msg: 'fields empty'
            })
        }
        const existExpense = await ExpenseModel.find({ title : title , user : user})
        if(!(existExpense.length == 0)){
            return res.status(400).json({
                msg: 'this expenses already exists'
            })
        }
        const expense = new ExpenseModel({ title, amount, category, user })
        try {
            await expense.save()
            res.status(201).json({
                msg: 'expense create'
            })
        } catch (error) {
            res.status(500).json({
                msg: `error server ${error}`
            })
        }
    }
}

export const exprensesController = new ExprensesController();