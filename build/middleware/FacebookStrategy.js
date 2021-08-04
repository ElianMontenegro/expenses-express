"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FacebookStrategy = require("passport-facebook").Strategy;
require("dotenv/config");
const optsFacebook = {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
};
//npm install mongoose-findorcreate
//const findOrCreate = require('mongoose-findorcreate');
exports.default = new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
});
