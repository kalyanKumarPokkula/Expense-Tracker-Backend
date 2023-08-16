"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const User_1 = require("../model/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateJWT = async (req, res, next) => {
    let AuthHeader = req.headers.authorization;
    console.log(AuthHeader);
    if (AuthHeader) {
        let token = AuthHeader.split(" ")[1];
        console.log(token);
        jsonwebtoken_1.default.verify(token, "avi", async function (err, data) {
            if (err) {
                return res.status(403).json({
                    message: "invalid token",
                    success: false,
                    err: err,
                });
            }
            else {
                let user = await User_1.User.findById(data.id);
                if (user) {
                    req.body.user = { id: user._id, name: user.name };
                    next();
                }
            }
        });
    }
    else {
        return res.status(403).json({
            message: "please pass the token",
            success: false,
        });
    }
};
exports.authenticateJWT = authenticateJWT;
