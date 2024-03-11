"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expense_1 = require("../model/Expense");
class ExpenseRepository {
    async create(data) {
        try {
            let expense = await Expense_1.Expense.create(data);
            console.log(expense);
            return expense;
        }
        catch (error) {
            console.log("Something went wrong in user Repo");
            throw error;
        }
    }
    async getExpense(id) {
        try {
            let expense = await Expense_1.Expense.findById(id);
            return expense;
        }
        catch (error) {
            console.log("Something went wrong in user Repo");
            throw error;
        }
    }
    async getExpensesByUser(id) {
        try {
            let expenses = await Expense_1.Expense.find({ author: id }).populate("category");
            return expenses;
        }
        catch (error) {
            console.log("Something went wrong in user Repo");
            throw error;
        }
    }
    async updateExpense(id, update) {
        try {
            let expense = await Expense_1.Expense.findByIdAndUpdate(id, update);
            return expense;
        }
        catch (error) {
            console.log("Something went wrong in user Repo");
            throw error;
        }
    }
    async deleteExpense(id) {
        try {
            let expense = await Expense_1.Expense.findByIdAndDelete(id);
            return expense;
        }
        catch (error) {
            console.log("Something went wrong in user Repo");
            throw error;
        }
    }
}
exports.default = ExpenseRepository;
