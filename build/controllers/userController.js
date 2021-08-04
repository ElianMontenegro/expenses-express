"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_1 = require("../models/user");
const JWThelpers_1 = require("../helpers/JWThelpers");
const FuctionHelpers_1 = require("../helpers/FuctionHelpers");
require("dotenv/config");
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, passwordRepeat } = req.body;
            if (!(username || email || password || passwordRepeat)) {
                return res.status(400).json({ msg: "fields empty" });
            }
            if (password !== passwordRepeat) {
                return res.status(400).json({ msg: "Passwords do not match" });
            }
            if (!(FuctionHelpers_1.fuctionHelpers.isEmail(email))) {
                return res.status(400).json({
                    msg: "this email is no valid"
                });
            }
            const user = yield user_1.UserModel.findOne({ email: email });
            if (user) {
                return res.status(400).json({ msg: "this email already exist" });
            }
            const newUser = new user_1.UserModel({ username, email, password });
            try {
                const user = yield newUser.save();
                res.status(201).json({
                    token: JWThelpers_1.JWThelpers.createAccessToken(user),
                    refreshToken: JWThelpers_1.JWThelpers.createrefreshToken(user),
                });
            }
            catch (error) {
                return res.status(500).json({
                    msg: `error ${error}`,
                });
            }
        });
    }
    loginOauth(req, res) {
        try {
            if (req.user) {
                const { _id, tokenVersion } = req.user;
                const user = { _id, tokenVersion };
                return res.status(201).json({
                    token: JWThelpers_1.JWThelpers.createAccessToken(_id),
                    refreshToken: JWThelpers_1.JWThelpers.createrefreshToken(user),
                });
            }
            return res.sendStatus(401);
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!(email || password)) {
                return res.status(400).json({
                    msg: 'fields empty'
                });
            }
            try {
                const user = yield user_1.UserModel.findOne({ email: email });
                if (!user) {
                    return res.status(404).json({
                        msg: "this user does not exists, you must first register"
                    });
                }
                const isMatch = yield user.comparePassword(password);
                if (!isMatch) {
                    return res.status(400).json({
                        msg: 'invalid password'
                    });
                }
                return res.status(200).json({
                    token: JWThelpers_1.JWThelpers.createAccessToken(user),
                    refreshToken: JWThelpers_1.JWThelpers.createrefreshToken(user),
                });
            }
            catch (error) {
                return res.status(500).json({
                    msg: "error server" + error,
                });
            }
        });
    }
    newAccessToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(req.user)) {
                    return res.sendStatus(401);
                }
                const { id, tokenVersion } = req.user;
                const user = yield user_1.UserModel.findOne({ _id: id });
                if (!user) {
                    return res.sendStatus(401);
                }
                if (user.tokenVersion !== tokenVersion) {
                    return res.sendStatus(401);
                }
                return res.status(200).json({
                    token: JWThelpers_1.JWThelpers.createAccessToken(user)
                });
            }
            catch (error) {
                return res.sendStatus(500);
            }
        });
    }
    revokeRefreshTokenByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(req.user)) {
                    return res.sendStatus(401);
                }
                const { id } = req.user;
                if (!(yield user_1.UserModel.updateOne({ _id: id }, { $inc: { tokenVersion: 1 } }))) {
                    return res.status(401).json({
                        msg: "unauthorized",
                    });
                }
                return res.sendStatus(204);
            }
            catch (error) {
                return res.status(500).json({
                    msg: error
                });
            }
        });
    }
}
exports.userController = new UserController();
