import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import { verifyAccessToken } from "../helpers/jwt.helper";
import { TokenExpiredError } from "jsonwebtoken";

declare module "express-serve-static-core"{
  interface Request {
    user?: {email: string, id: string}
  }
 }

 export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken: string =
      req.header("Authorization")?.split(" ")[1] as string;
      if (!accessToken){
        res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized: No token provided" });
        return 
      }

      const decoded = verifyAccessToken(accessToken)
      req.user = {...decoded}
      next()
    }catch(error){
        if (error instanceof TokenExpiredError) {
          res.status(StatusCodes.UNAUTHORIZED).json({ error: "Token has expired" });
          return;
        }
        
        res.status(StatusCodes.FORBIDDEN).json({ error: "Invalid token" });
    }
 }

