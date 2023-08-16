import ExpenseService from "../service/expenseService";
import { Request, Response } from "express";

const expenseService: ExpenseService = new ExpenseService();

const create = async (req: Request, res: Response) => {
  try {
    const newBody = { ...req.body, date: new Date(), author: req.body.user.id };
    console.log(req.body.user.id);

    let response = await expenseService.create(newBody, req.body.user.id);
    return res.status(201).json({
      data: response,
      message: "Successfully created a expenseData",
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: "Not able to create a expenseData",
      success: false,
      err: error,
    });
  }
};

const getExpenses = async (req: Request, res: Response) => {
  try {
    let response = await expenseService.getUserExpenses(req.body.user.id);
    return res.status(201).json({
      data: response?.expenses,
      message: "Successfully created a expenseData",
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: "Not able to get a user expenses",
      success: false,
      err: error,
    });
  }
};

export { create, getExpenses };
