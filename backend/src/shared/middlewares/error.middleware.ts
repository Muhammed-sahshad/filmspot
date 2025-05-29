import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/httpException";
import { StatusCodes } from "http-status-codes";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`[ERROR OCCURRED] => ${err.message}`);
  console.error(`[ERROR AT] => ${err.stack}`)

  if (err instanceof HttpException) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message || "Internal Server Error" });

};
