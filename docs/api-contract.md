# MEATLY REST API Contract Document

This document defines the expected REST API contract for the MEATLY local fresh-meat marketplace backend (`http://localhost:5000/api`).

---

## 1. Global Specifications

- **Base URL**: `http://localhost:5000/api`
- **Request Headers**:
  - `Content-Type: application/json`
  - `Accept: application/json`
  - `Authorization: Bearer <token>` *(for protected routes)*
- **Response Format**: JSON Object with standard envelope:
  ```json
  {
    "success": true,
    "data": {},
    "message": "Optional response message"
  }
  ```

---

## 2. Authentication Endpoints (`/api/auth`)

### `POST /api/auth/request-otp`
- **Purpose**: Sends OTP to customer's mobile number.
- **Access**: Public
- **Request Body**:
  ```json
  {
    "phone": "9876543210"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "OTP sent to +91 9876543210"
  }
  ```

### `POST /api/auth/verify-otp`
- **Purpose**: Verifies 6-digit OTP code and returns JWT bearer token.
- **Access**: Public
- **Request Body**:
  ```json
  {
    "phone": "9876543210",
    "otp": "123456"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsIn...",
    "user": {
      "id": "user-001",
      "fullName": "Rahul Verma",
      "phone": "9876543210",
      "email": "rahul.verma@example.com",
      "memberSince": "Sep 2026"
    }
  }
  ```

### `GET /api/auth/me`
- **Purpose**: Fetches authenticated customer's profile.
- **Access**: Protected (`Authorization: Bearer <token>`)
- **Response**:
  ```json
  {
    "id": "user-001",
    "fullName": "Rahul Verma",
    "phone": "9876543210",
    "email": "rahul.verma@example.com"
  }
  ```

---

## 3. Shops Endpoints (`/api/shops`)

### `GET /api/shops`
- **Query Params**: `category` *(optional: Chicken, Fish, Mutton)*
- **Purpose**: Returns active partner meat shops in Karimnagar.
- **Response**:
  ```json
  [
    {
      "id": "shop-1",
      "name": "Fresh Chicken Centre",
      "rating": 4.6,
      "reviewsCount": 142,
      "distance": "1.2 km",
      "deliveryTime": "25–35 min",
      "isOpen": true,
      "categories": ["Chicken", "Eggs"],
      "imageUrl": "https://...",
      "coverImageUrl": "https://...",
      "description": "Fresh chicken cuts prepared to your preference.",
      "address": "Collectorate Road, Karimnagar",
      "minOrder": 199,
      "deliveryFee": "Free delivery above ₹499"
    }
  ]
  ```

### `GET /api/shops/:id`
- **Purpose**: Returns single shop details and customer reviews.

---

## 4. Products Endpoints (`/api/products`)

### `GET /api/products?shopId=:shopId`
- **Purpose**: Returns product listing for a partner shop.
- **Response**:
  ```json
  [
    {
      "id": "p101",
      "title": "Chicken Curry Cut (Small Pieces)",
      "category": "Chicken",
      "weight": "500 g",
      "price": 180,
      "originalPrice": 200,
      "tag": "Best Seller",
      "imageUrl": "https://...",
      "description": "Tender curry cut chicken pieces."
    }
  ]
  ```

---

## 5. Orders Endpoints (`/api/orders`)

### `POST /api/orders`
- **Purpose**: Submits a new fresh meat order with cutting & cleaning preferences.
- **Access**: Protected
- **Request Body**:
  ```json
  {
    "customer": {
      "name": "Rahul Verma",
      "phone": "9876543210"
    },
    "deliveryAddress": {
      "house": "H.No 12-4-123",
      "street": "Collectorate Road",
      "city": "Karimnagar",
      "pincode": "505001"
    },
    "deliveryOption": {
      "id": "standard",
      "price": 40
    },
    "paymentMethod": {
      "id": "upi",
      "title": "UPI Payment"
    },
    "bill": {
      "itemTotal": 360,
      "deliveryFee": 40,
      "packagingFee": 15,
      "tax": 12,
      "finalTotal": 427
    },
    "items": [
      {
        "productId": "p101",
        "name": "Chicken Curry Cut",
        "weight": "500 g",
        "quantity": 2,
        "unitPrice": 180,
        "totalPrice": 360,
        "cutPreference": "Medium Cut",
        "cleaningPreference": "Skinless",
        "specialInstructions": "Remove excess fat"
      }
    ]
  }
  ```
- **Response**:
  ```json
  {
    "id": "MEATLY-1024",
    "orderNumber": "#MEATLY1024",
    "status": "placed",
    "createdAt": "2026-09-11T08:50:00Z"
  }
  ```

---

## 6. Addresses Endpoints (`/api/addresses`)

- `GET /api/addresses`: List saved addresses.
- `POST /api/addresses`: Add new delivery address.
- `PUT /api/addresses/:id`: Edit saved address.
- `DELETE /api/addresses/:id`: Remove saved address.

---

## 7. Error Handling Standard

- `401 Unauthorized`: Invalid or expired JWT token.
- `404 Not Found`: Shop or product ID not found.
- `422 Unprocessable Entity`: Validation failure (missing phone or delivery address).
- `500 Internal Server Error`: Backend error.
