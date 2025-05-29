# 🎬 FilmSpot

**FilmSpot** is a full-stack MERN application that allows users to search and explore movies via the OMDB API. While movie browsing is public, registered users can log in to mark favourites and manage their personal movie list. The backend follows a clean repository architecture and features secure JWT-based authentication using access and refresh tokens.

---

## 🚀 Features

- 🔍 Search for movies using the OMDB API
- 📃 View movie details without login
- ❤️ Authenticated users can add/remove favourites
- 🛡️ JWT Authentication (Access & Refresh Tokens)
- 💾 MongoDB for persistent storage
- 🧱 Repository-based backend architecture
- ⚙️ Built with TypeScript
- ✨ Clean and modular codebase

---

## 🧑‍💻 Tech Stack

### Frontend
- React
- TypeScript
- Axios
- React Router
- ShadCN/UI 
- Redux Toolkit 

### Backend
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT (access & refresh tokens)
- bcrypt (for password hashing)
- Repository-Service-Controller pattern

---

## 📁 Backend Project Structure

src/
│
├── controllers/ # Handle HTTP requests/responses
├── services/ # Business logic layer
├── repositories/ # Database operations
├── models/ # Mongoose schemas
├── routes/ # API route definitions
├── middlewares/ # Auth, error handling, etc.
├── utils/ # Helper functions
├── app.ts # App configuration
└── server.ts # Entry point

---

## 🔐 Authentication Flow

- Users sign up or log in using email and password
- Server issues:
  - **Access Token** – short-lived, used in headers for protected routes
  - **Refresh Token** – long-lived, used to regenerate access tokens
- Refresh tokens can be securely stored (e.g., HTTP-only cookies)
- Authenticated users can manage their favourites

---

## 🌐 Environment Variables

Create a `.env` file in the root directory and include the following:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/filmspot
OMDB_API_KEY=your_omdb_api_key
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

## 🛠️ Installation & Setup

# Clone the repository
git clone https://github.com/Muhammed-sahshad/filmspot.git
cd filmspot

# Install backend dependencies
npm install

# Create .env file with your credentials (see above)

# Start development server
npm run dev

