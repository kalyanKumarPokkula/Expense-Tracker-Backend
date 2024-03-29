"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpense = exports.updateExpense = exports.getExpense = exports.getExpenses = exports.create = void 0;
const expenseService_1 = __importDefault(require("../service/expenseService"));
const expenseService = new expenseService_1.default();
const create = async (req, res) => {
    try {
        const newBody = {
            price: req.body.price,
            title: req.body.title,
            date: req.body.date,
            author: req.body.user.id,
        };
        console.log(newBody);
        let response = await expenseService.create(newBody, req.body.user.id, req.body.category);
        return res.status(201).json({
            data: response,
            message: "Successfully created a expenseData",
            success: true,
            err: {},
        });
    }
    catch (error) {
        return res.status(500).json({
            data: {},
            message: "Not able to create a expenseData",
            success: false,
            err: error,
        });
    }
};
exports.create = create;
const getExpenses = async (req, res) => {
    try {
        console.log(req.query);
        let response = await expenseService.getUserExpensesByCategoryAndYear(req.body.user.id, req.query);
        return res.status(201).json({
            data: response,
            message: "Successfully fetched a expensesData",
            success: true,
            err: {},
        });
    }
    catch (error) {
        return res.status(500).json({
            data: {},
            message: "Not able to get a user expenses",
            success: false,
            err: error,
        });
    }
};
exports.getExpenses = getExpenses;
const getExpense = async (req, res) => {
    try {
        let response = await expenseService.getExpense(req.params.id);
        return res.status(201).json({
            data: response,
            message: "Successfully fetched a expenseData",
            success: true,
            err: {},
        });
    }
    catch (error) {
        return res.status(500).json({
            data: {},
            message: "Not able to get a expenses",
            success: false,
            err: error,
        });
    }
};
exports.getExpense = getExpense;
const updateExpense = async (req, res) => {
    try {
        let response = await expenseService.updateExpense(req.params.id, req.body);
        return res.status(201).json({
            data: response,
            message: "Successfully updated a expenseData",
            success: true,
            err: {},
        });
    }
    catch (error) {
        return res.status(500).json({
            data: {},
            message: "Not able to update a expense",
            success: false,
            err: error,
        });
    }
};
exports.updateExpense = updateExpense;
const deleteExpense = async (req, res) => {
    try {
        console.log(req.params);
        let response = await expenseService.deleteExpense(req.params.id);
        return res.status(201).json({
            data: response,
            message: "Successfully deleted a expense",
            success: true,
            err: {},
        });
    }
    catch (error) {
        return res.status(500).json({
            data: {},
            message: "Not able to delete a expense",
            success: false,
            err: error,
        });
    }
};
exports.deleteExpense = deleteExpense;
