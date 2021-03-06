  
import { Request, Response } from "express";
import { UserModel , IUserModel } from "../models/user";
import { JWThelpers } from "../helpers/JWThelpers";
import { fuctionHelpers } from '../helpers/FuctionHelpers';
import "dotenv/config";

class UserController {
    
    public async register(req: Request, res: Response) {
      const { username, email, password, passwordRepeat } = req.body;
      if (!(username || email || password || passwordRepeat)) {
        return res.status(400).json({ msg: "fields empty" });
      }
      if (password !== passwordRepeat){
        return res.status(400).json({ msg: "Passwords do not match" });
      }
      if(!(fuctionHelpers.isEmail(email))){
        return res.status(400).json({
              msg: "this email is no valid"
        })
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

    public loginOauth(req: Request, res: Response){
      try {
        if (req.user){
          const { _id , tokenVersion } : any  = req.user;
          const user : any = { _id, tokenVersion}
          return res.status(201).json({
            token: JWThelpers.createAccessToken(_id),
            refreshToken: JWThelpers.createrefreshToken(user),
          });
        }
        return res.sendStatus(401);
      } catch (error) {
        return res.sendStatus(500);
      }

    }

    public async login(req: Request, res: Response){
      const { email, password } = req.body
      if(!(email || password)){
        return res.status(400).json({
          msg: 'fields empty'
        })
      }
      try {
        const user = await UserModel.findOne({email : email})
        if(!user){
          return res.status(404).json({
            msg: "this user does not exists, you must first register"
          })
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
          return res.status(400).json({
            msg: 'invalid password'
          })
        }
        return res.status(200).json({
          token: JWThelpers.createAccessToken(user),
          refreshToken: JWThelpers.createrefreshToken(user),
        });
      } catch (error) {
        return res.status(500).json({
          msg: "error server" + error,
        });
      }
    }

    public async newAccessToken(req: Request, res: Response){
      try {
        if (!(req.user)){
          return res.sendStatus(401);
        }
        const { id , tokenVersion } : any  = req.user;
        const user = await UserModel.findOne({ _id: id  });
        if (!user) {
          return res.sendStatus(401);
        }

        if (user.tokenVersion !== tokenVersion) {
          return res.sendStatus(401);
        }

        return res.status(200).json({
          token: JWThelpers.createAccessToken(user)
        });
      } catch (error) {
        return res.sendStatus(500);
      }
    }   
    
    public async revokeRefreshTokenByUser(req: Request, res: Response){
      try {
        if (!(req.user)){
          return res.sendStatus(401);
        }
        const { id  } : any  = req.user;
        if (!(await UserModel.updateOne({ _id: id },{ $inc: { tokenVersion: 1 } }))
        ) {
          return res.status(401).json({
            msg: "unauthorized",
          });
        }
        return res.sendStatus(204);
        
      } catch (error) {
        return res.status(500).json({
          msg: error
        });
      }
    }
}

export const userController = new UserController();