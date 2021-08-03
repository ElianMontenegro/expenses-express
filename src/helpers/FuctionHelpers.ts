import { NextFunction, Request, Response } from "express";
class FuctionHelpers {
    public isEmail(email: string): boolean{
        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
        if(!(emailRegex.test(email))){
            return false
        }
        return true
    }

    public getToken(req: Request, res: Response){
        const refreshToken = req.headers["authorization"];
        const token : string = refreshToken! && refreshToken.split(" ")[1];
        if (!token || token == null) {
          return res.status(401).json({
            msg: "no token",
          });
        }
        return token
    }
}

export const fuctionHelpers = new FuctionHelpers();
