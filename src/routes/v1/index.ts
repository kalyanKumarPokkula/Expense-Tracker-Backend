import express from "express";

import { signup, signin } from "../../controllers/userController";
import {
  create,
  getExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
} from "../../controllers/expenseController";
import { authenticateJWT } from "../../middlewares/authenticateJwt";

const router = express.Router();

router.post("/signup", signup);
router.get("/me", authenticateJWT, (req, res) => {
  return res.status(200).json({
    success: true,
    data: req.body.user,
  });
});

router.get("/hello", (req, res) => {
  res.send("Hello world");
});

router.post("/expense", authenticateJWT, create);
router.get("/expenses/:year", authenticateJWT, getExpenses);
router.post("/signin", signin);
router.get("/expense/:id", authenticateJWT, getExpense);
router.patch("/expense/:id", authenticateJWT, updateExpense);
router.delete("/expense/:id", authenticateJWT, deleteExpense);

export default router;
