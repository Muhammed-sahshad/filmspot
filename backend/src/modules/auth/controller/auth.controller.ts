import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthService } from "../service/auth.service";
import { IAuthController } from "./IAuthController";
import { StatusCodes } from "http-status-codes";

export class AuthController implements IAuthController {
  constructor(private service: AuthService) {}

  register = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body)
    const { name, email, password } = req.body;
    const { refreshToken, ...user } = await this.service.register(name, email, password);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(StatusCodes.CREATED).json({ message: "user created succesfull", user });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const {refreshToken, ...user} = await this.service.login(email, password);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(StatusCodes.OK).json({message: "user logged in succesfull", user})
  });

  refresh = asyncHandler(async (req: Request, res: Response) => {

    const refreshToken = req.cookies.refreshToken as string
    const user = await this.service.refresh(refreshToken);
    res.status(StatusCodes.OK).json({message: "token refreshed succesfull", user})
  });
}
