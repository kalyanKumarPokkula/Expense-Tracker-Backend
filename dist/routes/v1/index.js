"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../../controllers/userController");
const expenseController_1 = require("../../controllers/expenseController");
const authenticateJwt_1 = require("../../middlewares/authenticateJwt");
const router = express_1.default.Router();
router.post("/signup", userController_1.signup);
router.get("/me", authenticateJwt_1.authenticateJWT, (req, res) => {
    return res.status(200).json({
        success: true,
        data: req.body.user,
    });
});
router.get("/hello", (req, res) => {
    res.send("Hello world");
});
router.post("/expense", authenticateJwt_1.authenticateJWT, expenseController_1.create);
router.get("/expenses/:year", authenticateJwt_1.authenticateJWT, expenseController_1.getExpenses);
router.post("/signin", userController_1.signin);
router.get("/expense/:id", authenticateJwt_1.authenticateJWT, expenseController_1.getExpense);
router.patch("/expense/:id", authenticateJwt_1.authenticateJWT, expenseController_1.updateExpense);
router.delete("/expense/:id", authenticateJwt_1.authenticateJWT, expenseController_1.deleteExpense);
exports.default = router;
