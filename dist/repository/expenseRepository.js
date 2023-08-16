"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expense_1 = require("../model/Expense");
class ExpenseRepository {
    async create(data) {
        try {
            let expense = await Expense_1.Expense.create(data);
            return expense;
        }
        catch (error) {
            console.log("Something went wrong in user Repo");
            throw error;
        }
    }
}
exports.default = ExpenseRepository;
