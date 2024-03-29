import UserService from "../service/userService";
import { Request, Response } from "express";

const userService: UserService = new UserService();

const signup = async (req: Request, res: Response) => {
  try {
    const newBody = { ...req.body, expenses: [] };

    console.log(newBody);

    let response = await userService.create(newBody);
    return res.status(201).json({
      data: response,
      message: "Successfully created a user",
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: "Not able to create a user",
      success: false,
      err: error,
    });
  }
};

const signin = async (req: Request, res: Response) => {
  try {
    let response = await userService.signin(req.body.email, req.body.password);
    return res.status(201).json({
      data: response,
      message: "Successfully logged in",
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: "Not able to login a user",
      success: false,
      err: error,
    });
  }
};

const verify_otp = async (req: Request, res: Response) => {
  try {
    let response = await userService.verify_otp(req.body.otp, req.body.userId);
    return res.status(201).json({
      data: response,
      message: "Successfully logged in",
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: "Not able to login a user",
      success: false,
      err: error,
    });
  }
};

const resend_otp = async (req: Request, res: Response) => {
  try {
    let response = await userService.Resend_OTP(req.body.userId);
    return res.status(201).json({
      data: response,
      message: "Successfully sended a otp ",
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: "Not able to send a otp",
      success: false,
      err: error,
    });
  }
};

export { signup, signin, verify_otp, resend_otp };
