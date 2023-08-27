"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expenseRepository_1 = __importDefault(require("../repository/expenseRepository"));
const userRepository_1 = __importDefault(require("../repository/userRepository"));
class ExpenseService {
    constructor() {
        this.expenseRepository = new expenseRepository_1.default();
        this.userRepository = new userRepository_1.default();
    }
    async create(data, id) {
        try {
            let expense = await this.expenseRepository.create(data);
            if (expense) {
                let user = await this.userRepository.findById(id);
                if (user) {
                    user.expenses.push(expense);
                    await user.save();
                }
                else {
                    console.log("User not found");
                }
            }
            return expense;
        }
        catch (error) {
            console.log("Something went wrong in user Service");
            throw error;
        }
    }
    async getUserExpensesByYear(id, year) {
        try {
            let response = await this.userRepository.getUserExpenses(id);
            let NewExpenses = [];
            // console.log(response);
            if (response) {
                for (var i = 0; i < response.expenses.length; i++) {
                    let date = new Date(response.expenses[i].date);
                    if (date.getFullYear().toString() === year) {
                        console.log(response.expenses[i]);
                        NewExpenses.push(response.expenses[i]);
                    }
                }
            }
            return NewExpenses;
        }
        catch (error) {
            console.log("Something went wrong in user Service");
            throw error;
        }
    }
    async getExpense(id) {
        try {
            let expense = await this.expenseRepository.getExpense(id);
            return expense;
        }
        catch (error) {
            console.log("Something went wrong in user Service");
            throw error;
        }
    }
    async updateExpense(id, data) {
        try {
            let expense = await this.expenseRepository.updateExpense(id, data);
            return expense;
        }
        catch (error) {
            console.log("Something went wrong in user Service");
            throw error;
        }
    }
    async deleteExpense(id) {
        try {
            let expense = await this.expenseRepository.deleteExpense(id);
            return expense;
        }
        catch (error) {
            console.log("Something went wrong in user Service");
            throw error;
        }
    }
}
exports.default = ExpenseService;
