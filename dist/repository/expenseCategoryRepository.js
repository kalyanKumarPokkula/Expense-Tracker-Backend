"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpenseCategory_1 = require("../model/ExpenseCategory");
class ExpenseCategoryRepository {
    async create(data) {
        try {
            let expenseCategory = await ExpenseCategory_1.ExpenseCategory.create(data);
            return expenseCategory;
        }
        catch (error) {
            console.log("Something went wrong in user Repo");
            throw error;
        }
    }
    async getExpenseCategory(category) {
        try {
            let expenseCategory = await ExpenseCategory_1.ExpenseCategory.findOne({
                category: category,
            });
            return expenseCategory;
        }
        catch (error) {
            console.log("Something went wrong in user Repo");
            throw error;
        }
    }
}
exports.default = ExpenseCategoryRepository;
