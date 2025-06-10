import bcrypt from "bcryptjs";
import { AuthRepository } from "../repository/auth.repository";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../../shared/helpers/jwt.helper";
import { IAuthService } from "./IAuthService";
import { HttpException } from "../../../shared/exceptions/httpException";
import { StatusCodes } from "http-status-codes";

export class AuthService implements IAuthService {
  constructor(private repo: AuthRepository) {}

  async register(name: string, email: string, password: string) {
    const existing = await this.repo.findByEmail(email);
    if (existing) {
      throw new HttpException("Email already in use", StatusCodes.CONFLICT);
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await this.repo.createUser({ name, email, password: hashed });

    const payload = { id: user._id.toString(), email: user.email };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    return {
      user: { _id: user._id, name: user.name, email: user.email },
      accessToken,
      refreshToken,
    };
  }

  async login(email: string, password: string) {
    const user = await this.repo.findByEmail(email);
    if (!user){
      throw new HttpException("Invalid Email Address", StatusCodes.NOT_FOUND)
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match){
      throw new HttpException("Incorrect Password", StatusCodes.UNAUTHORIZED)
    }

    const payload = { id: user._id.toString(), email: user.email };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    return {
      user: { _id: user._id, name: user.name, email: user.email },
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken);
    const user = await this.repo.findById(payload.id);
    if (!user){
      throw new HttpException("User Not Found", StatusCodes.NOT_FOUND)
    }

    const accessToken = generateAccessToken({email: payload.email, id: payload.id});
    return {
      user: { _id: user._id, name: user.name, email: user.email },
      accessToken,
    };
  }
}
