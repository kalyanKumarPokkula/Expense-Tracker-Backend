"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config/config");
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
userSchema.pre("save", function (next) {
    try {
        // const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt_1.default.hashSync(this.password, config_1.SALT);
        this.password = hashedPassword;
        return next();
    }
    catch (error) {
        console.log(error);
    }
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.User = User;
