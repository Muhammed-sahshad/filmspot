import { IUser } from "../../../shared/models/user.model";

export type AuthResponse = {
  user: Partial<IUser>;
  accessToken: string;
  refreshToken?: string;
};
