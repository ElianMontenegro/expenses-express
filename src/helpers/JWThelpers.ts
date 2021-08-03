import jwt from "jsonwebtoken";
import { IUserModel } from "../models/user";
import { NextFunction, Request, Response } from "express";
import  { fuctionHelpers } from '../helpers/FuctionHelpers'
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
            { id: user._id, tokenVersion: user.tokenVersion },
            process.env.REFRESHJWTSECRET!,
            {
                expiresIn: "7d",
                algorithm: "HS256",
                issuer: process.env.URL,
            }
        );
    }
    
    public authorizationAccessToken(req: Request, res: Response, next: NextFunction){
        const token : any = fuctionHelpers.getToken(req, res)
        jwt.verify(token, process.env.JWTSECRET!, (err : any , user : any) => {
            if (err) return res.sendStatus(403)
            req.user = user
            next();
        })
    }

    public authorizationRefreshToken(req: Request, res: Response, next: NextFunction){
        const token : any = fuctionHelpers.getToken(req, res)
        jwt.verify(token, process.env.REFRESHJWTSECRET!, (err : any , user : any) => {
            if (err) return res.sendStatus(403)
            req.user = user
            next();
        })
    }
}

export const JWThelpers = new JWTHelpers();
