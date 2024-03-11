import ExpenseService from "../service/expenseService";
import { Request, Response } from "express";

const expenseService: ExpenseService = new ExpenseService();

const create = async (req: Request, res: Response) => {
  try {
    const newBody = {
      price: req.body.price,
      title: req.body.title,
      date: req.body.date,
      author: req.body.user.id,
    };

    console.log(newBody);

    let response = await expenseService.create(
      newBody,
      req.body.user.id,
      req.body.category
    );

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
    console.log(req.query);
    let response = await expenseService.getUserExpensesByCategoryAndYear(
      req.body.user.id,
      req.query
    );
    return res.status(201).json({
      data: response,
      message: "Successfully fetched a expensesData",
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

const getExpense = async (req: Request, res: Response) => {
  try {
    let response = await expenseService.getExpense(req.params.id);
    return res.status(201).json({
      data: response,
      message: "Successfully fetched a expenseData",
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: "Not able to get a expenses",
      success: false,
      err: error,
    });
  }
};

const updateExpense = async (req: Request, res: Response) => {
  try {
    let response = await expenseService.updateExpense(req.params.id, req.body);
    return res.status(201).json({
      data: response,
      message: "Successfully updated a expenseData",
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: "Not able to update a expense",
      success: false,
      err: error,
    });
  }
};

const deleteExpense = async (req: Request, res: Response) => {
  try {
    console.log(req.params);

    let response = await expenseService.deleteExpense(req.params.id);
    return res.status(201).json({
      data: response,
      message: "Successfully deleted a expense",
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: "Not able to delete a expense",
      success: false,
      err: error,
    });
  }
};
export { create, getExpenses, getExpense, updateExpense, deleteExpense };
