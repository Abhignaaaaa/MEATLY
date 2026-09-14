# MEATLY Local Development & API Integration Guide

This guide describes how to run the MEATLY frontend application and connect it to a local backend API.

---

## 1. Port Architecture

- **Frontend Application (Vite + React)**: `http://localhost:3000`
- **Backend REST API**: `http://localhost:5000/api`

---

## 2. Environment Configuration

The frontend uses Vite environment variables defined in `.env` or `.env.local`:

```env
# MEATLY API Base URL
VITE_API_BASE_URL=http://localhost:5000/api

# Repository Mode Switch
# Set to 'true' to use local Mock Repository fallback data.
# Set to 'false' to route requests exclusively to the real REST API.
VITE_USE_MOCK_DATA=true
```

> **Note**: Never put API secrets, JWT private keys, or passwords in `VITE_*` variables as they are exposed to the client browser bundle.

---

## 3. Backend CORS Requirements

When running the backend server at `http://localhost:5000`, CORS (Cross-Origin Resource Sharing) must allow requests from origin `http://localhost:3000`.

### Express.js Example:
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

---

## 4. API Client & Repository Pattern

The MEATLY frontend follows a clean 4-tier data architecture:

```
React Component
      ->
Custom Hook (e.g. useShops, useOrders)
      ->
Repository Layer (e.g. shopRepository)
 ->                       ->
Mock Repository           API Service (apiClient + REST API)
```

- **Mock Repository Mode (`VITE_USE_MOCK_DATA=true`)**: Instant offline UI demonstration backed by `src/data/`.
- **API Mode (`VITE_USE_MOCK_DATA=false`)**: Fetches live data from `http://localhost:5000/api`. If the backend is temporarily offline, repository gracefully falls back to mock data while logging an error in the development console.

---

## 5. OTP Authentication & JWT Flow (Step 11)

MEATLY uses OTP authentication with JWT tokens.

- **Development OTP:** `123456`
- **Real SMS:** No SMS gateway is connected yet. The backend prints the OTP to the console, but for testing purposes, any valid phone number combined with `123456` will succeed.
- **JWT Handling:** Stored securely in `localStorage` under `meatly_auth_token`. Sent as `Authorization: Bearer <token>` automatically by the API client.
- **Persistent Sessions:** On reload, the `AuthContext` calls `GET /api/auth/me`. If a valid token is present, the session resumes smoothly. Invalid/Expired tokens are cleared.

---

## 6. Verification Commands

```bash
# Start frontend dev server
npm run dev

# Run production build check
npm run build
```
