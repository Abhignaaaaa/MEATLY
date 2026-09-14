import { userRepository } from '../repositories/user.repository.js';
import { ApiError } from '../utils/ApiError.js';
import { IUser } from '../models/User.js';

export class UserService {
  async getUserProfile(userId: string): Promise<IUser> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw ApiError.notFound('User not found');
    }
    return user;
  }

  async updateProfile(userId: string, updateData: { fullName?: string; email?: string; avatarUrl?: string }): Promise<IUser> {
    const user = await userRepository.update(userId, updateData);
    if (!user) {
      throw ApiError.notFound('User not found');
    }
    return user;
  }
}

export const userService = new UserService();
