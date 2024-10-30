import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";
import { CreateUser } from "../validations/VUser";
import boom from "@hapi/boom";

const authServices = new AuthService();

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const data = await CreateUser.validateAsync(req.body);
    const user = await authServices.signUp(data);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const token = await authServices.signIn(username, password);
    res.status(200).json({token});
  } catch (error) {
    next(error);
  }
};

export const logOut = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const user:any = req.user;
    if(!user){
      throw boom.notFound("User not found");
    }
    await authServices.logOut(user.user);
    res.status(200).json({message: "Logout success"});
  } catch (error) {
    _next(error);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, code } = req.body;
    const result = await authServices.verifyEmail(username, code);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.body;
    const result = await authServices.forgotPassword(username);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const confirmForgotPassword = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, code, password } = req.body;
    const result = await authServices.confirmForgotPassword(username, code, password);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
