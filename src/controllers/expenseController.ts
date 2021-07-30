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

    public async getAllExpenses(req: Request ,res: Response){
        try {
            const expenses = await ExpenseModel.find()
            if(!expenses){
                return res.status(404).json({
                    msg: 'There is not expenses'
                })
            }
            return res.status(200).json({
                expenses
            })
        } catch (error) {
            return res.status(500).json({
                msg: `server error ${error}`
            })
        }
    }

    public async getExpensesByUser(req: Request ,res: Response){
        const { id } = req.params

        try {
            const expenses = await ExpenseModel.find({user : id})
            if(!expenses){
                return res.status(404).json({
                    msg: 'There is not expenses'
                })
            }
            return res.status(200).json({
                expenses
            })
        } catch (error) {
            return res.status(500).json({
                msg: `server error ${error}`
            })
        }
    }

    public async deleteExpense(req: Request ,res: Response){
        const id = req.params.id;
        try {
            const data = await ExpenseModel.findOneAndDelete(id);
            if (!data) {
                return res.status(404).json({
                  msg: "expense not  found",
                });
            }
            return res.sendStatus(204)
        } catch (error) {
            return res.status(500).json({
                msg: `internal server error  ${error}`,
            });
        }
    }

    public async updateExpense(req: Request ,res: Response){
        const id = req.params.id;
        const { title, amount, category } = req.body
        const data = {
            title,
            amount,
            category
        }
        try { 
            const expense = await ExpenseModel.findOneAndUpdate({_id: id},data,{new: true});
            if (!expense) {
                return res.status(404).json({
                  msg: "expense not  found",
                });
            }
            return res.status(201).json({
                expense
            })
        } catch (error) {
            return res.status(500).json({
                msg: `internal server error  ${error}`,
            });
        }
    }
}

export const exprensesController = new ExprensesController();