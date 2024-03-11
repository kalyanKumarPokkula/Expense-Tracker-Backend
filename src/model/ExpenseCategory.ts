import { Schema, model } from "mongoose";

interface IExpenseCategory {
  category: string;
}

const ExpenseCategorySchema: Schema = new Schema<IExpenseCategory>(
  {
    category: {
      type: String,
      enum: [
        "Groceries",
        "Utilities",
        "Transport",
        "Entertainment",
        "Housing",
        "Healthcare",
        "Education",
        "Debt",
        "Investments",
        "Insurance",
        "Donations",
        "Miscellaneous",
        "Apparel",
        "Savings",
        "Gifts",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const ExpenseCategory = model<IExpenseCategory>(
  "ExpenseCategory",
  ExpenseCategorySchema
);

export { ExpenseCategory, IExpenseCategory };
