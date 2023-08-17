import ExpenseRepository from "../repository/expenseRepository";
import UserRepository from "../repository/userRepository";
import { IExpense } from "../model/Expense";

class ExpenseService {
  expenseRepository: ExpenseRepository;
  userRepository: UserRepository;
  constructor() {
    this.expenseRepository = new ExpenseRepository();
    this.userRepository = new UserRepository();
  }

  async create(data: IExpense, id: string) {
    try {
      console.log(data);
      console.log(id);

      let expense = await this.expenseRepository.create(data);
      console.log(expense);

      if (expense) {
        let user = await this.userRepository.findById(id);
        console.log(user);

        if (user) {
          user.expenses.push(expense);
          await user.save();
        } else {
          console.log("User not found");
        }
      }

      return expense;
    } catch (error) {
      console.log("Something went wrong in user Service");
      throw error;
    }
  }

  async getUserExpenses(id: string) {
    try {
      let expenses = await this.userRepository.getUserExpenses(id);
      return expenses;
    } catch (error) {
      console.log("Something went wrong in user Service");
      throw error;
    }
  }
}

export default ExpenseService;
