import { Schema, model, ObjectId } from "mongoose";
import bcrypt, { hashSync } from "bcrypt";
// import { SALT } from "../config/config";

interface User {
  name: string;
  email: string;
  password: string;
  expenses: ObjectId[];
}

const userSchema: Schema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 3,
  },
  expenses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
});

userSchema.pre<User>("save", function (next) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    console.log(error);
  }
});

const User = model<User>("User", userSchema);

export default User;
