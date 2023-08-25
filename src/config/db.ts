import mongoose from "mongoose";
import { DB_URL } from "./config";

const connect = () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/expensetracker");
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("Not connected to monogodb");
    console.log(error);
  }
};

export default connect;
