"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exprensesController = void 0;
const expense_1 = require("../models/expense");
class ExprensesController {
    createExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, amount, category, user } = req.body;
            if (!(title || amount || category || user)) {
                return res.status(400).json({
                    msg: 'fields empty'
                });
            }
            const existExpense = yield expense_1.ExpenseModel.find({ title: title, user: user });
            if (!(existExpense.length == 0)) {
                return res.status(400).json({
                    msg: 'this expenses already exists'
                });
            }
            const expense = new expense_1.ExpenseModel({ title, amount, category, user });
            try {
                yield expense.save();
                res.status(201).json({
                    expense
                });
            }
            catch (error) {
                res.status(500).json({
                    msg: `error server ${error}`
                });
            }
        });
    }
    getAllExpenses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const expenses = yield expense_1.ExpenseModel.find({}, ['title', 'amount']).populate('user', "username").populate('category', 'name');
                if (!expenses) {
                    return res.status(404).json({
                        msg: 'There is not expenses'
                    });
                }
                return res.status(200).json({
                    expenses
                });
            }
            catch (error) {
                return res.status(500).json({
                    msg: `server error ${error}`
                });
            }
        });
    }
    getExpensesByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const expenses = yield expense_1.ExpenseModel.find({ user: id });
                if (!expenses) {
                    return res.status(404).json({
                        msg: 'There is not expenses'
                    });
                }
                return res.status(200).json({
                    expenses
                });
            }
            catch (error) {
                return res.status(500).json({
                    msg: `server error ${error}`
                });
            }
        });
    }
    deleteExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const data = yield expense_1.ExpenseModel.findOneAndDelete(id);
                if (!data) {
                    return res.status(404).json({
                        msg: "expense not  found",
                    });
                }
                return res.sendStatus(204);
            }
            catch (error) {
                return res.status(500).json({
                    msg: `internal server error  ${error}`,
                });
            }
        });
    }
    updateExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { title, amount, category } = req.body;
            const data = {
                title,
                amount,
                category
            };
            try {
                const expense = yield expense_1.ExpenseModel.findOneAndUpdate({ _id: id }, data, { new: true });
                if (!expense) {
                    return res.status(404).json({
                        msg: "expense not  found",
                    });
                }
                return res.status(201).json({
                    expense
                });
            }
            catch (error) {
                return res.status(500).json({
                    msg: `internal server error  ${error}`,
                });
            }
        });
    }
}
exports.exprensesController = new ExprensesController();
