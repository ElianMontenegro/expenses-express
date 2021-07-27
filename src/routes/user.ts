import { Router } from "express";
import { userController } from "../controllers/userController";
import passport from "passport";
const UserRouter: Router = Router();

UserRouter.route("/api/register").post(userController.register);

UserRouter.get("/api", (req, res) => {
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

export default module.exports = UserRouter;
