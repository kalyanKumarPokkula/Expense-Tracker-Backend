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
}

export default ExpenseRepository;