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
  async (
    accessToken: String,
    refreshToken: String,
    profile: any,
    done: any
  ) => {
      console.log(profile);
      const newUser = new UserModel({
        facebookId: profile.id,
        username: profile.displayName,
        tokenVersion : profile.tokenVersion
  });
  try {
    const user = await UserModel.findOne({ facebookId: profile.facebookId });
    if (!user) {
      const user = await newUser.save();
      return done(null, user);
    }
    return done(null, user);
  }catch (error) {
    console.log(error);
  }   
  }
);


