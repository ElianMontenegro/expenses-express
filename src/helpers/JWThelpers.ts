import jwt from "jsonwebtoken";
import { IUserModel } from "../models/user";
import { NextFunction, Request, Response } from "express";
class JWTHelpers {
    public createAccessToken(user: IUserModel) {
        return jwt.sign({ id: user._id }, process.env.JWTSECRET!, {
            expiresIn: 920,
            algorithm: "HS256",
            issuer: process.env.URL,
        });
    }

    public createrefreshToken(user: IUserModel) {
        return jwt.sign(
            { id: user._id },
            process.env.REFRESHJWTSECRET!,
            {
                expiresIn: "7d",
                algorithm: "HS256",
                issuer: process.env.URL,
            }
        );
    }

    public verifyAccessToken(req: Request, res: Response): Response<string> | string {
        const refreshToken = req.headers["authorization"];
        const token : string = refreshToken! && refreshToken.split(" ")[1];
        if (!token || token == null) {
          return res.status(401).json({
            msg: "error empty token",
          });
        }
        return token
    }

    public authorizationToken(req: Request, res: Response, next: NextFunction){
        const refreshToken = req.headers["authorization"];
        const token : string = refreshToken! && refreshToken.split(" ")[1];
        if (!token || token == null) {
          return res.status(401).json({
            msg: "error empty token",
          });
        }
        jwt.verify(token, process.env.JWTSECRET!, (err : any , user : any) => {
            if (err) return res.sendStatus(403)
            req.user = user
            next();
        })
    }
}

export const JWThelpers = new JWTHelpers();
