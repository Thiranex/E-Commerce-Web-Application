# E-Commerce MERN Stack Application

A basic online store with product management and order tracking, built with the MERN stack (MongoDB, Express, React, Node.js) and optimized for deployment on Vercel.

## Features
- **Frontend**: Built with Vite, React, TailwindCSS, and React Router. Includes Home, Login, Register, and Cart (placeholder) pages. Modern UI with smooth interactions.
- **Backend**: Express.js server providing RESTful APIs.
- **Authentication**: JWT-based authentication and role-based access control (User/Admin).
- **Database**: MongoDB integration via Mongoose. Models for Users, Products, and Orders.

## Project Structure
The project is split into two main directories:
- `/frontend` - Contains the Vite React application.
- `/backend` - Contains the Express.js API.

## Getting Started Locally

### Prerequisites
- Node.js installed
- MongoDB URI (You can use MongoDB Atlas or a local instance)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update `.env` in the `backend` directory with your MongoDB connection string and a secret for JWT:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   *Note: Add `"dev": "nodemon index.js"` to your backend package.json scripts if not present.*

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## Vercel Deployment

Deploying a split directory on Vercel is best done by deploying them as two separate Vercel projects, or by restructuring to standard Vercel format.

### Option 1: Deploy Backend and Frontend Separately
1. **Backend**: Import the repository to Vercel, set the Root Directory to `backend`, and add your Environment Variables. The included `vercel.json` handles routing.
2. **Frontend**: Import the repository again to Vercel, set the Root Directory to `frontend`. Vercel will automatically detect Vite. 
3. *Important*: Update the API URL in the frontend (e.g., in `AuthContext.jsx` and `Home.jsx`) to point to your new backend deployment URL instead of `http://localhost:5000`.

### Option 2: Unified Vercel Deployment
To deploy as a single project, Vercel prefers the `api/` folder to be at the project root alongside the frontend code. If you wish to do this, move `backend/index.js` and routes into an `api/` folder inside `frontend/` and update paths accordingly.
