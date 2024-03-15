import { Schema, model } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  expenses: [Schema.Types.ObjectId];
  otp: string;
  isEmailVerified?: boolean;
  forgotPasswordToken?: boolean;
  forgotPasswordExpiry?: Date;
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
    otp: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
  },

  { timestamps: true }
);

const User = model("User", userSchema);

export { User, IUser };
