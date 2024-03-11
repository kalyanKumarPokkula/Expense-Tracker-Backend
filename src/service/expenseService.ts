import ExpenseRepository from "../repository/expenseRepository";
import UserRepository from "../repository/userRepository";
import ExpenseCategoryRepository from "../repository/expenseCategoryRepository";
import { IExpense } from "../model/Expense";

class ExpenseService {
  expenseRepository: ExpenseRepository;
  userRepository: UserRepository;
  expenseCategoryRepository: ExpenseCategoryRepository;
  constructor() {
    this.expenseRepository = new ExpenseRepository();
    this.userRepository = new UserRepository();
    this.expenseCategoryRepository = new ExpenseCategoryRepository();
  }

  async create(data: IExpense, id: string, category: string) {
    try {
      console.log(data);

      let expenseCategory =
        await this.expenseCategoryRepository.getExpenseCategory(category);
      if (!expenseCategory) {
        expenseCategory = await this.expenseCategoryRepository.create({
          category: category,
        });
        console.log(expenseCategory);
      }

      let expense = await this.expenseRepository.create({
        title: data.title,
        author: data.author,
        price: data.price,
        date: data.date,
        category: expenseCategory._id,
      });

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
      let response = await this.expenseRepository.getExpensesByUser(id);
      let NewExpenses = [];
      if (response) {
        for (var i = 0; i < response.length; i++) {
          let date = new Date(response[i].date);
          if (date.getFullYear().toString() === year) {
            let expense = {
              title: response[i].title,

              author: response[i].author,
              date: response[i].date,
              price: response[i].price,
              _id: response[i]._id,
              category: response[i].category?.category,
            };
            NewExpenses.push(expense);
          }
        }
      }
      return NewExpenses;
    } catch (error) {
      console.log("Something went wrong in user Service");
      throw error;
    }
  }

  async getUserExpensesByCategoryAndYear(id: string, query: Object) {
    try {
      let response = await this.expenseRepository.getExpensesByUser(id);
      let NewExpensesByYear = [];
      if (response) {
        for (var i = 0; i < response.length; i++) {
          let date = new Date(response[i].date);
          if (date.getFullYear().toString() === query.year) {
            let expense = {
              title: response[i].title,

              author: response[i].author,
              date: response[i].date,
              price: response[i].price,
              _id: response[i]._id,
              category: response[i].category?.category,
            };
            NewExpensesByYear.push(expense);
          }
        }
      }
      let NewExpenses = [];
      if (NewExpensesByYear.length > 0 && query.category !== "") {
        for (let i = 0; i < NewExpensesByYear.length; i++) {
          if (NewExpensesByYear[i].category === query.category) {
            NewExpenses.push(NewExpensesByYear[i]);
          }
        }
      }

      if (NewExpenses.length > 0 || query.category !== "") {
        return NewExpenses;
      }

      return NewExpensesByYear;
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

  async deleteExpense(id: string) {
    try {
      let expense = await this.expenseRepository.deleteExpense(id);
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
}

export default ExpenseService;
