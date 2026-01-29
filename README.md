# Connect Frontend
Connect is a full-stack learning/session platform where students can book instructors, chat in real time, attend live video sessions, and get AI assistance — all inside one system.


## Tech Stack
- React
- TypeScript
- Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- Socket.IO Client
- Stripe.js
- ImageKit React SDK
- ZegoCloud SDK


## Core Features
- Role-based dashboards (Student, Instructor, Admin)
- Session browsing and booking
- Stripe payment integration
- Real-time chat
- AI assistant dashboard
- Video call sessions
- Notifications system
- Google OAuth login


## Environment Variables
Create a `.env` file in the root:

VITE_API_URL=
VITE_SOCKET_API_URL=
VITE_GOOGLE_AUTH_URL=
VITE_IMAGEKIT_PUBLIC_KEY=
VITE_IMAGEKIT_ENDPOINT=
VITE_GEMINI_API_KEY=
VITE_STRIPE_PUBLISHABLE_KEY=
VITE_ZEGO_APP_ID=
VITE_ZEGO_SERVER_SECRET=


## Installation & Setup
1. git clone <repo-url>
2. cd <project-folder>
3. npm install
4. npm run dev


## Available Scripts
npm run dev        # Starts the Vite development server with hot reload
npm run build      # Runs TypeScript project build (tsc -b) and then creates an optimized production build using Vite
npm run preview    # Serves the production build locally to preview before deployment
npm run lint       # Runs ESLint to check for code quality and style issues


## Architecture
- Modular component structure
- Centralized API handling
- Redux for global state
- Protected and role-based routing
- Reusable UI components and hooks



## Backend Dependency
This frontend requires the Connect Backend API to be running.


## Author
Hadi Risha

