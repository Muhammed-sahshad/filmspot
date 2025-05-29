import jwt from "jsonwebtoken";
import "../configs/dotenv"

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || "15m";
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || "7d";

interface Payload {
  id: string;
  email: string;
}

export const generateAccessToken = (payload: Payload): string => {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY as any});
};

export const generateRefreshToken = (payload: Payload): string => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY as any});
};

export const verifyAccessToken = (token: string): Payload => {
  return jwt.verify(token, ACCESS_SECRET) as Payload;
};

export const verifyRefreshToken = (token: string): Payload => {
  return jwt.verify(token, REFRESH_SECRET) as Payload;
};
