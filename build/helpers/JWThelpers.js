"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWThelpers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const FuctionHelpers_1 = require("../helpers/FuctionHelpers");
class JWTHelpers {
    createAccessToken(user) {
        return jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWTSECRET, {
            expiresIn: 920,
            algorithm: "HS256",
            issuer: process.env.URL,
        });
    }
    createrefreshToken(user) {
        return jsonwebtoken_1.default.sign({ id: user._id, tokenVersion: user.tokenVersion }, process.env.REFRESHJWTSECRET, {
            expiresIn: "7d",
            algorithm: "HS256",
            issuer: process.env.URL,
        });
    }
    authorizationAccessToken(req, res, next) {
        const token = FuctionHelpers_1.fuctionHelpers.getToken(req, res);
        jsonwebtoken_1.default.verify(token, process.env.JWTSECRET, (err, user) => {
            if (err)
                return res.sendStatus(403);
            req.user = user;
            next();
        });
    }
    authorizationRefreshToken(req, res, next) {
        const token = FuctionHelpers_1.fuctionHelpers.getToken(req, res);
        jsonwebtoken_1.default.verify(token, process.env.REFRESHJWTSECRET, (err, user) => {
            if (err)
                return res.sendStatus(403);
            req.user = user;
            next();
        });
    }
}
exports.JWThelpers = new JWTHelpers();
