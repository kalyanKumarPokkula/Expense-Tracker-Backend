"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository_1 = __importDefault(require("../repository/userRepository"));
const generateOTP_1 = __importDefault(require("../config/generateOTP"));
const mailer_1 = __importDefault(require("../utils/mailer"));
class UserService {
    constructor() {
        this.userRepository = new userRepository_1.default();
    }
    async Resend_OTP(userId) {
        try {
            let user = await this.userRepository.findById(userId);
            if (user) {
                let otp = (0, generateOTP_1.default)();
                user.otp = otp;
                await user.save();
                (0, mailer_1.default)(user.email, otp);
                return true;
            }
            return false;
        }
        catch (error) {
            console.log("Something went wrong in user Service");
            throw error;
        }
    }
    async create(data) {
        try {
            let OTP = (0, generateOTP_1.default)();
            data.otp = OTP;
            let hashedPassword = this.hashPassword(data.password);
            let NewUser = { ...data, password: hashedPassword };
            let user = await this.userRepository.create(NewUser);
            if (user) {
                (0, mailer_1.default)(user.email, OTP);
            }
            // if (user) {
            //   let token = this.generateJwt(user);
            //   let newUser = {
            //     name: user.name,
            //     id: user._id,
            //     token: token,
            //   };
            //   return newUser;
            // }
            return user;
        }
        catch (error) {
            console.log("Something went wrong in user Service");
            throw error;
        }
    }
    async signin(email, password) {
        try {
            let user = await this.userRepository.getUserByEmail(email);
            if (user) {
                let compare = this.comparePassword(password, user.password);
                if (!user.isEmailVerified) {
                    return {
                        success: false,
                        id: user._id,
                        message: "Please verify your email",
                        isVerified: user.isEmailVerified,
                        err: {},
                    };
                }
                if (compare) {
                    let token = this.generateJwt(user);
                    let newUser = {
                        name: user.name,
                        id: user._id,
                        token: token,
                        isVerified: user.isEmailVerified,
                    };
                    return newUser;
                }
                else {
                    throw { message: "Incorrect password" };
                }
            }
            else {
                throw { message: "Incorrect email" };
            }
        }
        catch (error) {
            console.log("Something went wrong in user Service");
            throw error;
        }
    }
    async verify_otp(otp, userId) {
        try {
            let user = await this.userRepository.findById(userId);
            if (user) {
                if (user.otp === otp) {
                    user.isEmailVerified = true;
                    await user.save();
                    let token = this.generateJwt(user);
                    let newUser = {
                        name: user.name,
                        id: user._id,
                        token: token,
                    };
                    return newUser;
                }
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.log("Something went wrong in token generate fun");
            throw error;
        }
    }
    comparePassword(password, hashedPassword) {
        try {
            let compare = bcrypt_1.default.compareSync(password, hashedPassword);
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
    hashPassword(password) {
        let hasdpassword = bcrypt_1.default.hashSync(password, 10);
        return hasdpassword;
    }
}
exports.default = UserService;
