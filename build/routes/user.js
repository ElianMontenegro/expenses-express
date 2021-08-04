"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const JWThelpers_1 = require("../helpers/JWThelpers");
const passport_1 = __importDefault(require("passport"));
const UserRouter = express_1.Router();
UserRouter.route("/api/register").post(userController_1.userController.register);
UserRouter.route("/api/login").post(userController_1.userController.login);
UserRouter.route("/api/refreshToken").post(JWThelpers_1.JWThelpers.authorizationRefreshToken, userController_1.userController.newAccessToken);
UserRouter.route("/api/logout").post(JWThelpers_1.JWThelpers.authorizationRefreshToken, userController_1.userController.revokeRefreshTokenByUser);
//google
UserRouter.get("/api/google", (req, res) => {
    res.send('<a href="/auth/google">authentication</a>');
});
UserRouter.get("/auth/google", passport_1.default.authenticate("google", { scope: ["email", "profile"] }));
UserRouter.get("/google/callback", passport_1.default.authenticate("google", { session: false }), userController_1.userController.loginOauth);
// facebook
UserRouter.get("/api/facebook", (req, res) => {
    res.send('<a href="/auth/facebook">authentication</a>');
});
UserRouter.get("/auth/facebook", passport_1.default.authenticate("facebook"));
UserRouter.get("/auth/facebook/callback", passport_1.default.authenticate("facebook", { session: false }), userController_1.userController.loginOauth);
exports.default = module.exports = UserRouter;
