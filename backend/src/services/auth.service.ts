import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/user.repository.js';
import { config } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { IUser } from '../models/User.js';

// Development in-memory OTP store
const otpStore = new Map<string, string>();

export class AuthService {
  async requestOtp(phone: string): Promise<{ message: string }> {
    if (!phone || phone.length < 10) {
      throw ApiError.badRequest('Please enter a valid 10-digit mobile number');
    }

    if (config.otpMode === 'demo') {
      const devOtp = config.demoOtp;
      otpStore.set(phone, devOtp);
      console.log(`[AuthService Dev] OTP for +91 ${phone} is ${devOtp}`);
      return { message: `OTP sent to +91 ${phone} (Demo Code: ${devOtp})` };
    } else {
      // TODO: Implement real SMS provider here (e.g. Twilio, MSG91)
      const realOtp = Math.floor(100000 + Math.random() * 900000).toString();
      otpStore.set(phone, realOtp);
      console.log(`[AuthService Prod] Sending OTP to +91 ${phone}`);
      return { message: `OTP sent to +91 ${phone}` };
    }
  }

  async verifyOtp(phone: string, otp: string): Promise<{ token: string; user: IUser }> {
    if (!phone || !otp) {
      throw ApiError.badRequest('Phone number and OTP code are required');
    }

    const storedOtp = otpStore.get(phone);
    const isDemoBypass = config.otpMode === 'demo' && otp === config.demoOtp;
    
    if (otp !== storedOtp && !isDemoBypass) {
      throw ApiError.badRequest('Invalid OTP code. Please try again.');
    }

    otpStore.delete(phone);

    let user = await userRepository.findByPhone(phone);
    if (!user) {
      user = await userRepository.create({
        fullName: 'Rahul Verma',
        phone,
        email: 'rahul.verma@example.com',
        role: 'customer',
        memberSince: 'Sep 2026',
      });
    }

    const token = jwt.sign(
      { userId: user._id, phone: user.phone, role: user.role },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn as jwt.SignOptions['expiresIn'] }
    );

    return { token, user };
  }

  async signup(userData: { fullName: string; phone: string; email?: string }): Promise<{ message: string }> {
    if (!userData.fullName || !userData.phone) {
      throw ApiError.badRequest('Full name and mobile phone number are required');
    }

    let user = await userRepository.findByPhone(userData.phone);
    if (user) {
      user.fullName = userData.fullName;
      if (userData.email) user.email = userData.email;
      await user.save();
    } else {
      await userRepository.create({
        fullName: userData.fullName,
        phone: userData.phone,
        email: userData.email || '',
        role: 'customer',
      });
    }

    return this.requestOtp(userData.phone);
  }

  async getCurrentUser(userId: string): Promise<IUser> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw ApiError.notFound('Customer profile not found');
    }
    return user;
  }

  async updateProfile(userId: string, data: { fullName?: string; email?: string }): Promise<IUser> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw ApiError.notFound('Customer profile not found');
    }
    
    // Prevent updating protected fields
    if (data.fullName !== undefined) user.fullName = data.fullName;
    if (data.email !== undefined) user.email = data.email;
    
    await user.save();
    return user;
  }
}

export const authService = new AuthService();
