# Nexora — Role-Based Authentication & JWT Microservice

Nexora is a full-stack authentication project built to demonstrate user registration, login, JWT-based authentication, and role-based access control.

## Features

- User registration and login
- Password handling through the backend authentication flow
- JSON Web Token (JWT) authentication
- Protected profile endpoint: `GET /api/auth/me`
- Role-based access control for `user` and `admin`
- React frontend with animated authentication UI
- Logout by clearing the saved authentication token
- Registration and login feedback messages

## Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

**Backend**
- Node.js
- Express
- MongoDB
- JWT

## Project Structure

```text
Nexora/
├── client/              # React + Vite frontend
│   ├── src/
│   ├── package.json
│   └── .gitignore
├── server/              # Express API
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── package.json
│   └── .gitignore
├── .gitignore
└── README.md
```

> Folder names inside `server/` may differ slightly depending on your implementation.

## Prerequisites

- Node.js (LTS recommended)
- npm
- MongoDB running locally, or a MongoDB connection string

## Setup

Open two terminals from the project root.

### 1. Configure the backend

```powershell
cd server
npm install
```

Create a `server/.env` file and add your actual values:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/nexora
JWT_SECRET=replace_with_a_long_random_secret
```

Use the environment variable names expected by your backend code. If your code uses a different MongoDB or JWT variable name, match the `.env` keys to that code.

Start the backend:

```powershell
npm run dev
```

If your backend does not define a `dev` script, check `server/package.json` and use its available start script, for example `npm start`.

### 2. Configure the frontend

In a second terminal:

```powershell
cd client
npm install
npm run dev
```

Open the local URL printed by Vite in the terminal, commonly `http://localhost:5173`.

## API Overview

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/auth/register` | Create an account |
| `POST` | `/api/auth/login` | Sign in and receive a JWT |
| `GET` | `/api/auth/me` | Get the current authenticated user's details |

The `/api/auth/me` endpoint should be called with the token in the request header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

Your backend may include additional routes. Document them here if you add more endpoints.

## Roles and Access Control

- `user`: standard authenticated account
- `admin`: account allowed to access admin-protected functionality

Public registration should assign the standard `user` role. Do not allow people to choose `admin` in the public registration form. For development testing, create or promote an admin account using a controlled, trusted method.

## Manual Testing Checklist

- [ ] Register with a new email address.
- [ ] Confirm the success message appears.
- [ ] Log in with the newly created account.
- [ ] Confirm the dashboard shows the user's details.
- [ ] Refresh the page and verify the authenticated session behavior.
- [ ] Log out and confirm the protected dashboard is no longer visible.
- [ ] Confirm an unauthenticated request to a protected endpoint is rejected.
- [ ] Confirm a normal user cannot access an admin-only endpoint.
- [ ] Confirm invalid credentials and duplicate email addresses show useful errors.

## Security Notes

- Never commit `.env` files, real secrets, database credentials, or JWT signing keys.
- Use a strong, unique `JWT_SECRET`; never use the example value in production.
- Ensure passwords are hashed on the backend before being stored.
- Validate and sanitize incoming data on the server.
- Configure CORS for the intended frontend origin before deployment.
- Use HTTPS in production.
- For production applications, consider secure, HttpOnly cookies or carefully assess the risks of browser local storage for tokens.
- Do not expose an unrestricted public endpoint for creating admin accounts.

## Troubleshooting

**Frontend cannot reach the API**
- Make sure the backend is running on the expected port.
- Check the API base URL in the frontend and the backend CORS configuration.

**MongoDB connection error**
- Ensure MongoDB is running, or check that `MONGO_URI` is correct and reachable.

**Environment variables are undefined**
- Confirm `dotenv` is loaded before the variables are used and that the `.env` file is in the backend's expected working directory.

## Author

**Avesh Kumar**

Portfolio / GitHub: add your profile links here.

---

This project is intended for learning and portfolio demonstration. Review the security configuration before deploying it publicly.
