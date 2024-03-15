import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SECRET } from "../config/config";
import UserRepository from "../repository/userRepository";
import { IUser } from "../model/User";
import generateOTP from "../config/generateOTP";
import sendEmail from "../utils/mailer";

class UserService {
  userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async Resend_OTP(userId: string) {
    try {
      let user = await this.userRepository.findById(userId);
      if (user) {
        let otp = generateOTP();
        user.otp = otp;
        await user.save();
        sendEmail(user.email, otp);
        return true;
      }

      return false;
    } catch (error) {
      console.log("Something went wrong in user Service");
      throw error;
    }
  }

  async create(data: IUser) {
    try {
      let OTP = generateOTP();
      data.otp = OTP;
      let hashedPassword = this.hashPassword(data.password);
      let NewUser: IUser = { ...data, password: hashedPassword };
      let user = await this.userRepository.create(NewUser);

      if (user) {
        sendEmail(user.email, OTP);
      }

      // if (user) {
      //   let token = this.generateJwt(user);
      //   let newUser = {
      //     name: user.name,
      //     id: user._id,
      //     token: token,
      //   };
      //   return newUser;
      // }
      return user;
    } catch (error) {
      console.log("Something went wrong in user Service");
      throw error;
    }
  }

  async signin(email: string, password: string) {
    try {
      let user = await this.userRepository.getUserByEmail(email);

      if (user) {
        let compare = this.comparePassword(password, user.password);

        if (!user.isEmailVerified) {
          return {
            success: false,
            id: user._id,
            message: "Please verify your email",
            isVerified: user.isEmailVerified,
            err: {},
          };
        }

        if (compare) {
          let token = this.generateJwt(user);
          let newUser = {
            name: user.name,
            id: user._id,
            token: token,
            isVerified: user.isEmailVerified,
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

  async verify_otp(otp: Number, userId: string) {
    try {
      let user = await this.userRepository.findById(userId);
      if (user) {
        if (user.otp === otp) {
          user.isEmailVerified = true;
          await user.save();
          let token = this.generateJwt(user);
          let newUser = {
            name: user.name,
            id: user._id,
            token: token,
          };
          return newUser;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log("Something went wrong in token generate fun");
      throw error;
    }
  }

  comparePassword(password: string, hashedPassword: string) {
    try {
      let compare = bcrypt.compareSync(password, hashedPassword);

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
