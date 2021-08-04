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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport_1 = __importDefault(require("passport"));
const user_1 = require("../models/user");
const optsGoogle = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
};
exports.default = new GoogleStrategy(optsGoogle, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new user_1.UserModel({
        username: profile.given_name + " " + profile.family_name,
        email: profile.email,
        tokenVersion: profile.tokenVersion
    });
    try {
        const user = yield user_1.UserModel.findOne({ email: profile.email });
        if (!user) {
            const user = yield newUser.save();
            return done(null, user);
        }
        return done(null, user);
    }
    catch (error) {
        console.log(error);
    }
}));
passport_1.default.serializeUser((user, done) => {
    console.log(user);
    done(null, user.id);
});
