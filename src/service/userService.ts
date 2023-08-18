import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SECRET } from "../config/config";
import UserRepository from "../repository/userRepository";
import { IUser } from "../model/User";

class UserService {
  userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data: IUser) {
    try {
      let hashedPassword = this.hashPassword(data.password);
      let NewUser: IUser = { ...data, password: hashedPassword };
      let user = await this.userRepository.create(NewUser);

      if (user) {
        let token = this.generateJwt(user);
        let newUser = {
          name: user.name,
          id: user._id,
          token: token,
        };
        return newUser;
      }
      return user;
    } catch (error) {
      console.log("Something went wrong in user Service");
      throw error;
    }
  }

  async signin(email: string, password: string) {
    try {
      let user = await this.userRepository.getUserByEmail(email);
      console.log(user);

      if (user) {
        let compare = this.comparePassword(password, user.password);
        console.log(compare);

        if (compare) {
          let token = this.generateJwt(user);
          let newUser = {
            name: user.name,
            id: user._id,
            token: token,
          };
          return newUser;
        } else {
          throw { message: "Incorrect password" };
        }
      } else {
        throw { message: "Incorrect email" };
      }
    } catch (error) {
      console.log("Something went wrong in user Service");
      throw error;
    }
  }

  comparePassword(password: string, hashedPassword: string) {
    try {
      console.log(password);
      console.log(hashedPassword);

      let compare = bcrypt.compareSync(password, hashedPassword);
      console.log(compare);

      return compare;
    } catch (error) {
      console.log("Something went wrong in token generate fun");
      throw error;
    }
  }

  generateJwt(user: any) {
    try {
      let payload = { name: user.name, id: user._id };
      let token = jwt.sign(payload, "avi", {
        expiresIn: "23h",
      });
      return token;
    } catch (error) {
      console.log("Something went wrong in token generate fun");
      throw error;
    }
  }

  hashPassword(password: string) {
    let hasdpassword = bcrypt.hashSync(password, 10);
    return hasdpassword;
  }
}

export default UserService;
