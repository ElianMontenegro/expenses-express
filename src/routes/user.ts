import { Router } from "express";
import { userController } from "../controllers/userController";
import passport from 'passport';
const UserRouter : Router = Router();

UserRouter.route("/api/register")
    .post(userController.register);

UserRouter.get('/api', (req, res) => {
    res.send('<a href="/auth/google">autrhntication</a>');
})

UserRouter.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

UserRouter.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/google/success',
        failureRedirect: '/google/failure'
}));

export default module.exports = UserRouter;