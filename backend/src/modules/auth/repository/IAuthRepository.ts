import { IUser } from "../../../shared/models/user.model";

export interface IAuthRepository {
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  createUser(data: Partial<IUser>): Promise<IUser>;
}
