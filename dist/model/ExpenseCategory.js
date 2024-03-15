"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseCategory = void 0;
const mongoose_1 = require("mongoose");
const ExpenseCategorySchema = new mongoose_1.Schema({
    category: {
        type: String,
        enum: [
            "Groceries",
            "Utilities",
            "Transport",
            "Entertainment",
            "Housing",
            "Healthcare",
            "Education",
            "Debt",
            "Investments",
            "Insurance",
            "Donations",
            "Miscellaneous",
            "Apparel",
            "Savings",
            "Gifts",
        ],
        required: true,
    },
}, { timestamps: true });
const ExpenseCategory = (0, mongoose_1.model)("ExpenseCategory", ExpenseCategorySchema);
exports.ExpenseCategory = ExpenseCategory;
