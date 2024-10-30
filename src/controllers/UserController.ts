import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import boom from "@hapi/boom";

const userService = new UserService();

export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const user = await userService.store(data);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const show = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token:any = req.user;
    
    if(!token){
      throw boom.unauthorized("Invalid token");
    }
    const profile = await userService.show(token);
    res.status(200).json(profile);
  } catch (error: any) {
    if (error.__type === "NotAuthorizedException") {
        return next(boom.unauthorized("Invalid token"));
    }
    next(error);
  }
};