const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
import passport from "passport";
import { UserModel } from "../models/user";

const optsGoogle = {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL!
};

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user : any, done)=> {
  done(null, user);
})

export default new GoogleStrategy(
    optsGoogle,
    (accessToken : String, refreshToken : String, profile : any, done : any) => {
    // const user = await UserModel.findOne({email: profile.email})
    // if(!user){
        
    // }
    console.log(profile);
    
    return done(null, profile);
  
  }
);
