import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SECRET } from "../config/config";
import UserRepository from "../repository/userRepository";
import { IUser } from "../model/User";

interface ISignIn {
  email: string;
  password: string;
}

class UserService {
  userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data: IUser) {
    try {
      let user = await this.userRepository.create(data);
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

  async signIn(payload: ISignIn) {
    try {
      console.log(payload);

      let user = await this.userRepository.getUserByEmail(payload.email);
      if (user) {
        let compare = this.comparePassword(payload.password, user.password);
        if (compare) {
          let token = this.generateJwt(user);
          let newUser = {
            name: user.name,
            id: user._id,
            token: token,
          };
          return newUser;
        } else {
          throw { Message: "Incorrect password" };
        }
      }
    } catch (error) {
      console.log("Something went wrong in user Service");
      throw error;
    }
  }

  private comparePassword(password: string, hashedPassword: string) {
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

  private generateJwt(user: any) {
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
}

export default UserService;
