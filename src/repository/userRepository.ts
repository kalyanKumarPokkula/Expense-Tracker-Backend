import { User, IUser } from "../model/User";

class UserRepository {
  async create(data: IUser) {
    try {
      let user = await User.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in user Repo");
      throw error;
    }
  }

  async findById(id: string) {
    try {
      let user = await User.findById(id);
      return user;
    } catch (error) {
      console.log("Something went wrong in user Repo");
      throw error;
    }
  }

  async getUserByEmail(email: string) {
    try {
      let user = await User.findOne({ email: email });
      return user;
    } catch (error) {
      console.log("Something went wrong in user Repo");
      throw error;
    }
  }

  async getUserExpenses(id: string) {
    try {
      let user = await User.findById(id).populate("expenses");
      console.log(user);

      return user;
    } catch (error) {
      console.log("Something went wrong in user Repo");
      throw error;
    }
  }
}

export default UserRepository;
