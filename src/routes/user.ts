import { Router } from "express";
import { userController } from "../controllers/userController";
import passport from "passport";
const UserRouter: Router = Router();

UserRouter.route("/api/register").post(userController.register);

UserRouter.route("/api/login").post(userController.login);

//google
UserRouter.get("/api/google", (req, res) => {
  res.send('<a href="/auth/google">autrhntication</a>');
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
  res.send('<a href="/auth/facebook">autrhntication</a>');
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
