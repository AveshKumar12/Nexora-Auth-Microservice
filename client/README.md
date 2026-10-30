
# Nexora — Frontend

Nexora is a modern and animated authentication frontend built with React. It provides a clean user interface for account registration, login, and an authenticated dashboard.

## Features

- User registration
- User login
- Success and error messages
- JWT-based authentication integration
- Authenticated dashboard
- User profile details
- Logout functionality
- Responsive interface
- Animated UI transitions

## Technologies Used

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- JavaScript

## Installation

Make sure Node.js and npm are installed.

Open a terminal in the client folder:

```bash
npm install
```

## Run the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal. Vite commonly uses:

```text
http://localhost:5173
```

## Backend Connection

The frontend communicates with the Nexora backend API.

Default API URL:

```text
http://localhost:5000/api/auth
```

Make sure the backend server is running before testing registration and login.

## Authentication Flow

1. A user creates an account using the registration form.
2. The frontend sends registration data to the backend.
3. The user receives a registration success message.
4. The user logs in with their credentials.
5. The backend returns a JWT token.
6. The frontend uses the token to access protected user information.
7. The user can log out from the dashboard.


## 📸 Project Screenshots

### Login Page
![Nexora Login](client/public/images/login.png)

### Registration Page
![Nexora Register](client/public/images/register.png)

### User Dashboard
![Nexora Dashboard](client/public/images/dashboard.png)

## Project Structure

```text
client/
├── public/
├── src/
│   ├── components/
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

> Update the structure above if your actual frontend folders differ.

## Author

Avesh Kumar
