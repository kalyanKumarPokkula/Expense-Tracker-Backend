"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const connect = () => {
    try {
        mongoose_1.default.connect(config_1.DB_URL);
        console.log("Connected to mongodb");
    }
    catch (error) {
        console.log("Not connected to monogodb");
        console.log(error);
    }
};
exports.default = connect;
