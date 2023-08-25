"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const userService_1 = __importDefault(require("../service/userService"));
const userService = new userService_1.default();
const signup = async (req, res) => {
    try {
        const newBody = { ...req.body, expenses: [] };
        console.log(newBody);
        let response = await userService.create(newBody);
        return res.status(201).json({
            data: response,
            message: "Successfully created a user",
            success: true,
            err: {},
        });
    }
    catch (error) {
        return res.status(500).json({
            data: {},
            message: "Not able to create a user",
            success: false,
            err: error,
        });
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    try {
        let response = await userService.signin(req.body.email, req.body.password);
        return res.status(201).json({
            data: response,
            message: "Successfully logged in",
            success: true,
            err: {},
        });
    }
    catch (error) {
        return res.status(500).json({
            data: {},
            message: "Not able to login a user",
            success: false,
            err: error,
        });
    }
};
exports.signin = signin;
