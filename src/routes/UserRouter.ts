import express from "express";
import passport from "passport";
import * as UserController from "../controllers/UserController";

const Router = express.Router();

// Router.post("/store", passport.authenticate("jwt", { session: false }), UserController.store);
Router.get("/show", passport.authenticate("jwt", { session: false }), UserController.show);

export default Router;