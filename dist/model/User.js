"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 3,
    },
    expenses: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Expense",
        },
    ],
}, { timestamps: true });
const User = (0, mongoose_1.model)("User", userSchema);
exports.User = User;
