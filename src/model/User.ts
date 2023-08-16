import { Schema, model, ObjectId } from "mongoose";
import bcrypt, { hashSync } from "bcrypt";
import { SALT } from "../config/config";

interface IUser {
  name: string;
  email: string;
  password: string;
  expenses: [Schema.Types.ObjectId];
}

const userSchema: Schema = new Schema<IUser>(
  {
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
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", function (next) {
  try {
    // const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(this.password, SALT);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    console.log(error);
  }
});

const User = model<IUser>("User", userSchema);

export { User, IUser };
