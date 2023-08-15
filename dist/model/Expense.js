"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const expenseSchema = new mongoose_1.Schema({
    date: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
});
const Expense = (0, mongoose_1.model)("Expense", expenseSchema);
exports.default = Expense;
