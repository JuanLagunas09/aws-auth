import express from "express";
import * as AuthController from "../controllers/AuthController";
import passport from "passport";

const Router = express.Router();

Router.post("/signup", AuthController.signUp);
Router.post("/signin", AuthController.signIn);
Router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  AuthController.logOut
);
Router.post(
  "/verify",
  AuthController.verifyEmail
);

Router.post(
  "/forgotpass",
  AuthController.forgotPassword
)

Router.post(
  "/confirmforgotpass",
  AuthController.confirmForgotPassword
)

//

export default Router;
