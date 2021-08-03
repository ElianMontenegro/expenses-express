const GoogleStrategy = require("passport-google-oauth2").Strategy;
import passport from "passport";
import { UserModel } from "../models/user";
import { JWThelpers } from "../helpers/JWThelpers";
const optsGoogle = {
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: process.env.GOOGLE_CALLBACK_URL!,
};

export default new GoogleStrategy(
  optsGoogle,
  async (
    accessToken: String,
    refreshToken: String,
    profile: any,
    done: any
  ) => {
    const newUser = new UserModel({
          username: profile.given_name + " " + profile.family_name,
          email: profile.email,
          tokenVersion : profile.tokenVersion
    });
    try {
      const user = await UserModel.findOne({ email: profile.email });
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

passport.serializeUser((user : any, done : any) => {
  console.log(user);
  
  done(null, user.id)
})


