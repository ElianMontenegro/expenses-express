const FacebookStrategy = require("passport-facebook").Strategy;
import passport from 'passport';
import { UserModel } from "../models/user";
import "dotenv/config";

const optsFacebook = {
    clientID: process.env.FACEBOOK_CLIENT_ID!,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL!,
};
//npm install mongoose-findorcreate
//const findOrCreate = require('mongoose-findorcreate');
export default new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID!,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL!,
  },
  (
    accessToken: String,
    refreshToken: String,
    profile: any,
    done: any
  ) => {
      console.log(profile);
  }
);