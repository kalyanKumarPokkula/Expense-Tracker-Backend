import { Schema, model } from "mongoose";

interface IExpense {
  date: string;
  price: string;
  title: string;
  category?: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
}

const expenseSchema: Schema = new Schema<IExpense>(
  {
    date: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "ExpenseCategory",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Expense = model<IExpense>("Expense", expenseSchema);

export { Expense, IExpense };
