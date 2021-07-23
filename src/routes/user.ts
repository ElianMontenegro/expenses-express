import { Router } from "express";
import { userController } from "../controllers/userController";
const UserRouter : Router = Router();

UserRouter.route("/api/register")
    .post(userController.register);


export default module.exports = UserRouter;