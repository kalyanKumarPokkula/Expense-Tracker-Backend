"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMAIL_PASS = exports.EMAIL_ID = exports.DB_URL = exports.SECRET = exports.SALT = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const PORT = process.env.PORT;
exports.PORT = PORT;
const SALT = bcrypt_1.default.genSaltSync(6);
exports.SALT = SALT;
const EMAIL_ID = process.env.EMAIL_ID;
exports.EMAIL_ID = EMAIL_ID;
const EMAIL_PASS = process.env.EMAIL_PASS;
exports.EMAIL_PASS = EMAIL_PASS;
const SECRET = process.env.SECRET;
exports.SECRET = SECRET;
const DB_URL = process.env.DBURL;
exports.DB_URL = DB_URL;
