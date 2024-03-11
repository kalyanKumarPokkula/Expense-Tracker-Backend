"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../model/User");
class UserRepository {
    async create(data) {
        try {
            let user = await User_1.User.create(data);
            return user;
        }
        catch (error) {
            console.log("Something went wrong in user Repo");
            throw error;
        }
    }
    async findById(id) {
        try {
            let user = await User_1.User.findById(id);
            return user;
        }
        catch (error) {
            console.log("Something went wrong in user Repo");
            throw error;
        }
    }
    async getUserByEmail(email) {
        try {
            let user = await User_1.User.findOne({ email: email });
            return user;
        }
        catch (error) {
            console.log("Something went wrong in user Repo");
            throw error;
        }
    }
    async getUserExpenses(id) {
        try {
            let user = await User_1.User.findById(id).populate("expenses");
            console.log(user);
            return user;
        }
        catch (error) {
            console.log("Something went wrong in user Repo");
            throw error;
        }
    }
}
exports.default = UserRepository;
