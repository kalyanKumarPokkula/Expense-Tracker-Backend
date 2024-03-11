import { ExpenseCategory, IExpenseCategory } from "../model/ExpenseCategory";

class ExpenseCategoryRepository {
  async create(data: IExpenseCategory) {
    try {
      let expenseCategory = await ExpenseCategory.create(data);
      return expenseCategory;
    } catch (error) {
      console.log("Something went wrong in user Repo");
      throw error;
    }
  }

  async getExpenseCategory(category: string) {
    try {
      let expenseCategory = await ExpenseCategory.findOne({
        category: category,
      });
      return expenseCategory;
    } catch (error) {
      console.log("Something went wrong in user Repo");
      throw error;
    }
  }
}

export default ExpenseCategoryRepository;
