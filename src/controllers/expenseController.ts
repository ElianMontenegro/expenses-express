import { Request, Response } from "express";
import { ExpenseModel } from '../models/expense';

class ExprensesController {

    public async createExpense(req: Request ,res: Response) {
        const {  title, amount, category, user } = req.body;
        if(!(title || amount || category)){
            return res.status(400).json({
                msg: 'fields empty'
            })
        }
        if (!(req.user)){
            return res.sendStatus(401);
        }
        const { id } : any  = req.user;
        const existExpense = await ExpenseModel.find({ title : title , user : id})
        if(!(existExpense.length == 0)){
            return res.status(400).json({
                msg: 'this expenses already exists'
            })
        }
        const expense = new ExpenseModel({ title, amount, category, user : id })
        try {
            await expense.save()
            res.status(201).json({
                expense
            })
        } catch (error) {
            res.status(500).json({
                msg: `error server ${error}`
            })
        }
    }

    public async getAllExpenses(req: Request ,res: Response){
        try {
            const expenses = await ExpenseModel.find({}, ['title','amount']).populate('user', "username").populate('category', 'name')
            if(expenses.length == 0){
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
        const idExpense = req.params.id;
        if(!idExpense){
            return res.status(400).json({
                msg: 'the id expenses is missing'
            });
        }
        if (!(req.user)){
            return res.sendStatus(401);
        }
        const { id } : any  = req.user;
        try {
            const data = await ExpenseModel.findOneAndDelete({user: id , _id : idExpense});
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