import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/meatly_db',
  jwtSecret: process.env.JWT_SECRET || 'meatly_dev_jwt_secret_karimnagar_2026',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  otpMode: process.env.OTP_MODE || 'demo',
  demoOtp: process.env.DEMO_OTP || '123456',
};
