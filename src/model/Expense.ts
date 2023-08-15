import { Schema, model, ObjectId } from "mongoose";

interface Expense {
  date: string;
  price: string;
  title: string;
  author: ObjectId;
}

const expenseSchema: Schema = new Schema<Expense>({
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
  author: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const Expense = model<Expense>("Expense", expenseSchema);

export default Expense;
