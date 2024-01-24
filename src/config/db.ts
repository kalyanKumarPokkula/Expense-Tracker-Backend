import mongoose from "mongoose";
import { DB_URL } from "./config";

const connect = () => {
  try {
    mongoose.connect(DB_URL!);
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("Not connected to monogodb");
    console.log(error);
  }
};

export default connect;
