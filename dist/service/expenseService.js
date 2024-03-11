"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expenseRepository_1 = __importDefault(require("../repository/expenseRepository"));
const userRepository_1 = __importDefault(require("../repository/userRepository"));
const expenseCategoryRepository_1 = __importDefault(require("../repository/expenseCategoryRepository"));
class ExpenseService {
    constructor() {
        this.expenseRepository = new expenseRepository_1.default();
        this.userRepository = new userRepository_1.default();
        this.expenseCategoryRepository = new expenseCategoryRepository_1.default();
    }
    async create(data, id, category) {
        try {
            console.log(data);
            let expenseCategory = await this.expenseCategoryRepository.getExpenseCategory(category);
            if (!expenseCategory) {
                expenseCategory = await this.expenseCategoryRepository.create({
                    category: category,
                });
                console.log(expenseCategory);
            }
            let expense = await this.expenseRepository.create({
                title: data.title,
                author: data.author,
                price: data.price,
                date: data.date,
                category: expenseCategory._id,
            });
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
        var _a;
        try {
            let response = await this.expenseRepository.getExpensesByUser(id);
            let NewExpenses = [];
            if (response) {
                for (var i = 0; i < response.length; i++) {
                    let date = new Date(response[i].date);
                    if (date.getFullYear().toString() === year) {
                        let expense = {
                            title: response[i].title,
                            author: response[i].author,
                            date: response[i].date,
                            price: response[i].price,
                            _id: response[i]._id,
                            category: (_a = response[i].category) === null || _a === void 0 ? void 0 : _a.category,
                        };
                        NewExpenses.push(expense);
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
    async getUserExpensesByCategoryAndYear(id, query) {
        var _a;
        try {
            let response = await this.expenseRepository.getExpensesByUser(id);
            let NewExpensesByYear = [];
            if (response) {
                for (var i = 0; i < response.length; i++) {
                    let date = new Date(response[i].date);
                    if (date.getFullYear().toString() === query.year) {
                        let expense = {
                            title: response[i].title,
                            author: response[i].author,
                            date: response[i].date,
                            price: response[i].price,
                            _id: response[i]._id,
                            category: (_a = response[i].category) === null || _a === void 0 ? void 0 : _a.category,
                        };
                        NewExpensesByYear.push(expense);
                    }
                }
            }
            let NewExpenses = [];
            if (NewExpensesByYear.length > 0 && query.category !== "") {
                for (let i = 0; i < NewExpensesByYear.length; i++) {
                    if (NewExpensesByYear[i].category === query.category) {
                        NewExpenses.push(NewExpensesByYear[i]);
                    }
                }
            }
            if (NewExpenses.length > 0 || query.category !== "") {
                return NewExpenses;
            }
            return NewExpensesByYear;
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
}
exports.default = ExpenseService;
