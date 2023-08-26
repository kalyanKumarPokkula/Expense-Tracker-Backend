import { Expense, IExpense } from "../model/Expense";

class ExpenseRepository {
  async create(data: IExpense) {
    try {
      let expense = await Expense.create(data);
      return expense;
    } catch (error) {
      console.log("Something went wrong in user Repo");
      throw error;
    }
  }

  async getExpense(id: string) {
    try {
      let expense = await Expense.findById(id);
      return expense;
    } catch (error) {
      console.log("Something went wrong in user Repo");
      throw error;
    }
  }

  async updateExpense(id: string, update: {}) {
    try {
      let expense = await Expense.findByIdAndUpdate(id, update);
      return expense;
    } catch (error) {
      console.log("Something went wrong in user Repo");
      throw error;
    }
  }

  async deleteExpense(id: string) {
    try {
      let expense = await Expense.findByIdAndDelete(id);
      return expense;
    } catch (error) {
      console.log("Something went wrong in user Repo");
      throw error;
    }
  }
}

export default ExpenseRepository;
