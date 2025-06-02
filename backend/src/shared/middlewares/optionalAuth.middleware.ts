import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../helpers/jwt.helper";

declare module "express-serve-static-core"{
  interface Request {
    user?: {email: string, id: string}
  }
 }

export const optionalAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const accessToken: string = req.cookies.accessToken || req.header("Authorization")?.split(" ")[1];

  if (accessToken) {
    const decoded = verifyAccessToken(accessToken);
    req.user = { ...decoded };
  }

  next();
};
