import { User } from "../model/User";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";
import { Request, Response, NextFunction } from "express";

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let AuthHeader = req.headers.authorization;
  console.log(AuthHeader);
  if (AuthHeader) {
    let token = AuthHeader.split(" ")[1];
    console.log(token);

    jwt.verify(token, "avi", async function (err: any, data: any) {
      if (err) {
        return res.status(403).json({
          message: "invalid token",
          success: false,
          err: err,
        });
      } else {
        let user = await User.findById(data.id);
        if (user) {
          req.body.user = { id: user._id, name: user.name };
          next();
        }
      }
    });
  } else {
    return res.status(403).json({
      message: "please pass the token",
      success: false,
    });
  }
};
