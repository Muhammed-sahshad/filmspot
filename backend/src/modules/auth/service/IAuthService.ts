import { AuthResponse } from "../types/AuthResponse";

export interface IAuthService {
  register(name: string, email: string, password: string): Promise<AuthResponse>;
  login(email: string, password: string): Promise<AuthResponse>;
  refresh(refreshToken: string): Promise<AuthResponse>;
}
