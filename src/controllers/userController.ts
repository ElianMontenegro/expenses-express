  
import { Request, Response } from "express";
import { UserModel } from "../models/user";
import { JWThelpers } from "../helpers/JWThelpers";

class UserController {
    public async register(req: Request, res: Response) {
      const { username, email, password, passwordRepeat } = req.body;
      if (!(username || email || password || passwordRepeat)) {
        return res.status(400).json({ msg: "fields empty" });
      }
      if (password !== passwordRepeat){
        return res.status(400).json({ msg: "Passwords do not match" });
      }
      const user = await UserModel.findOne({ email: email });
      if (user) {
        return res.status(400).json({ msg: "this email already exist" });
      }
  
      const newUser = new UserModel({ username, email, password });
      try {
        const user = await newUser.save();
        res.status(201).json({
          token: JWThelpers.createAccessToken(user),
          refreshToken: JWThelpers.createrefreshToken(user),
        });
      } catch (error) {
        return res.status(500).json({
          msg: `error ${error}`,
        });
      }
    }
}

export const userController = new UserController();