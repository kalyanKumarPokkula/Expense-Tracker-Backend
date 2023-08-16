import express from "express";

import { signup, signin } from "../../controllers/userController";
import { create, getExpenses } from "../../controllers/expenseController";
import { authenticateJWT } from "../../middlewares/authenticateJwt";

const router = express.Router();

router.post("/signup", signup);
router.post("/expense", authenticateJWT, create);
router.get("/expenses", authenticateJWT, getExpenses);
router.post("/signin", signin);

export default router;
