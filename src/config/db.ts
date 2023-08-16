import mongoose from "mongoose";

const connect = () => {
  try {
    mongoose.connect(
      `mongodb+srv://akhilkalyan:${"Kalyan123"}@cluster0.fqm7swm.mongodb.net/Expense-Tracker-db`
    );
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("Not connected to monogodb");
    console.log(error);
  }
};

export default connect;
