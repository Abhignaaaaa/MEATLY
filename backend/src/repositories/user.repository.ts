import { User, IUser } from '../models/User.js';

export class UserRepository {
  async findByPhone(phone: string): Promise<IUser | null> {
    return User.findOne({ phone });
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async create(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return user.save();
  }

  async update(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, updateData, { new: true });
  }
}

export const userRepository = new UserRepository();
