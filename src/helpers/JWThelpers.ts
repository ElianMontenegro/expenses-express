import jwt from "jsonwebtoken";
import { IUserModel } from "../models/user";

class JWTHelpers {
    public createAccessToken(user: IUserModel) {
        return jwt.sign({ id: user._id }, process.env.JWTSECRET!, {
            expiresIn: 120,
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
}

export const JWThelpers = new JWTHelpers();
