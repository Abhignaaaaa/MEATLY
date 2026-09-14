# MEATLY Deployment Guide

This guide covers how to deploy the MEATLY application (MVP).

## Architecture Overview

- **Frontend**: React (Vite)
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB (Atlas)
- **Payments**: Razorpay

## Recommended Hosting

- **Frontend**: Vercel or Netlify (Great for Vite/React SPA)
- **Backend**: Render, Railway, or Fly.io (Great for Node.js APIs)
- **Database**: MongoDB Atlas (Free tier available)

---

## 1. Environment Variables

### Backend (`backend/.env`)

Create a `.env` file in the `backend/` directory:

```env
# Application Port
PORT=5000

# MongoDB Connection String (Atlas or Local)
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/meatly?retryWrites=true&w=majority

# JWT Authentication Secret
JWT_SECRET=your_super_secret_random_string_here_change_in_production

# Frontend URL for CORS
FRONTEND_URL=https://your-frontend-domain.com

# Razorpay Configuration (For real payments)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Payment Mode (Use 'mock' for local development/testing without real money)
# PAYMENT_MODE=mock
```

### Frontend (`frontend/.env` or just `.env` in root)

Create a `.env` file in the root directory:

```env
# Backend API Base URL
VITE_API_BASE_URL=https://your-backend-domain.com/api

# Razorpay Client Key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

---

## 2. Deploying the Backend (e.g., to Render)

1. Connect your GitHub repository to Render.
2. Create a new **Web Service**.
3. Set the **Root Directory** to `backend`.
4. Set the **Build Command** to:
   ```bash
   npm install && npm run build
   ```
5. Set the **Start Command** to:
   ```bash
   npm start
   ```
6. Add all the Environment Variables listed above in the Render dashboard.

---

## 3. Deploying the Frontend (e.g., to Vercel)

1. Connect your GitHub repository to Vercel.
2. Set the **Root Directory** to the main folder (where `vite.config.js` is).
3. The Build Command should automatically be detected as:
   ```bash
   npm run build
   ```
4. Add the Frontend Environment Variables in the Vercel dashboard.
5. Deploy.

---

## 4. Final Verification

1. Create a customer account, add items to cart, and place a Mock COD order.
2. Log in as `srinivas.owner@example.com` (Shop Owner) and verify the order appears.
3. Update the order status to `delivered`.
4. Log in as `admin@meatly.in` (Admin) and verify the dashboard stats have updated!
