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
      let expense = await this.expenseRepository.create(data);

      if (expense) {
        let user = await this.userRepository.findById(id);

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

  async getUserExpensesByYear(id: string, year: string) {
    try {
      let response = await this.userRepository.getUserExpenses(id);
      let NewExpenses = [];
      // console.log(response);

      if (response) {
        for (var i = 0; i < response.expenses.length; i++) {
          let date = new Date(response.expenses[i].date);
          if (date.getFullYear().toString() === year) {
            console.log(response.expenses[i]);

            NewExpenses.push(response.expenses[i]);
          }
        }
      }
      return NewExpenses;
    } catch (error) {
      console.log("Something went wrong in user Service");
      throw error;
    }
  }

  async getExpense(id: string) {
    try {
      let expense = await this.expenseRepository.getExpense(id);
      return expense;
    } catch (error) {
      console.log("Something went wrong in user Service");
      throw error;
    }
  }

  async updateExpense(id: string, data: {}) {
    try {
      let expense = await this.expenseRepository.updateExpense(id, data);
      return expense;
    } catch (error) {
      console.log("Something went wrong in user Service");
      throw error;
    }
  }

  async deleteExpense(id: string) {
    try {
      let expense = await this.expenseRepository.deleteExpense(id);
      return expense;
    } catch (error) {
      console.log("Something went wrong in user Service");
      throw error;
    }
  }
}

export default ExpenseService;
