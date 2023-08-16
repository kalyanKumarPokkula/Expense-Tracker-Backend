"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository_1 = __importDefault(require("../repository/userRepository"));
class UserService {
    constructor() {
        this.userRepository = new userRepository_1.default();
    }
    async create(data) {
        try {
            let user = await this.userRepository.create(data);
            if (user) {
                let token = this.generateJwt(user);
                let newUser = {
                    name: user.name,
                    id: user._id,
                    token: token,
                };
                return newUser;
            }
            return user;
        }
        catch (error) {
            console.log("Something went wrong in user Service");
            throw error;
        }
    }
    async signIn(payload) {
        try {
            console.log(payload);
            let user = await this.userRepository.getUserByEmail(payload.email);
            if (user) {
                let compare = this.comparePassword(payload.password, user.password);
                if (compare) {
                    let token = this.generateJwt(user);
                    let newUser = {
                        name: user.name,
                        id: user._id,
                        token: token,
                    };
                    return newUser;
                }
                else {
                    throw { Message: "Incorrect password" };
                }
            }
        }
        catch (error) {
            console.log("Something went wrong in user Service");
            throw error;
        }
    }
    comparePassword(password, hashedPassword) {
        try {
            console.log(password);
            console.log(hashedPassword);
            let compare = bcrypt_1.default.compareSync(password, hashedPassword);
            console.log(compare);
            return compare;
        }
        catch (error) {
            console.log("Something went wrong in token generate fun");
            throw error;
        }
    }
    generateJwt(user) {
        try {
            let payload = { name: user.name, id: user._id };
            let token = jsonwebtoken_1.default.sign(payload, "avi", {
                expiresIn: "23h",
            });
            return token;
        }
        catch (error) {
            console.log("Something went wrong in token generate fun");
            throw error;
        }
    }
}
exports.default = UserService;
