import User, { IUser } from "../../../shared/models/user.model";
import { IAuthRepository } from "./IAuthRepository";

export class AuthRepository implements IAuthRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async createUser(data: Partial<IUser>): Promise<IUser> {
   return await User.create(data)
  }
}
