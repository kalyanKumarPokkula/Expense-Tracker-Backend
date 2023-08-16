"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpenses = exports.create = void 0;
const expenseService_1 = __importDefault(require("../service/expenseService"));
const expenseService = new expenseService_1.default();
const create = async (req, res) => {
    try {
        const newBody = { ...req.body, date: new Date(), author: req.body.user.id };
        console.log(req.body.user.id);
        let response = await expenseService.create(newBody, req.body.user.id);
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
        let response = await expenseService.getUserExpenses(req.body.user.id);
        return res.status(201).json({
            data: response === null || response === void 0 ? void 0 : response.expenses,
            message: "Successfully created a expenseData",
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
