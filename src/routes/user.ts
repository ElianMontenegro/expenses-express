import { Router } from "express";
import { userController } from "../controllers/userController";
import { JWThelpers } from "../helpers/JWThelpers"
import passport from "passport";
const UserRouter: Router = Router();

UserRouter.route("/api/register").post(userController.register);

UserRouter.route("/api/login").post(userController.login);

UserRouter.route("/api/refreshToken").post(JWThelpers.authorizationRefreshToken , userController.newAccessToken);

UserRouter.route("/api/logout").post(JWThelpers.authorizationRefreshToken , userController.revokeRefreshTokenByUser);

//google
UserRouter.get("/api/google", (req, res) => {
  res.send('<a href="/auth/google">authentication</a>');
});


UserRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

UserRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  userController.loginOauth
);

// facebook
UserRouter.get("/api/facebook", (req, res) => {
  res.send('<a href="/auth/facebook">authentication</a>');
});

UserRouter.get(
  "/auth/facebook",
  passport.authenticate("facebook")
);

UserRouter.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  userController.loginOauth
);

export default module.exports = UserRouter;
