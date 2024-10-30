import { Request, Response, NextFunction } from "express";
import { isBoom } from "@hapi/boom";

export const HapiErrorHandler = (
  error: any,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isBoom(error)) {
    const { statusCode, payload } = error.output;
    res.status(statusCode).json({
      statusCode,
      error: payload.error,
      message: payload.message,
    });
  }
  next(error);
};
