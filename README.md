# Vacation Management System

A full-stack vacation management application built with Vue.js, Node.js, PostgreSQL, and TypeORM.

The application allows employees to submit vacation requests and managers to review, approve, or reject them.

---

# Features

## Authentication
- Sign up
- Sign in
- Role selection:
  - Requester
  - Validator

---

# Requester Interface
- Submit vacation requests
- View vacation request history
- Track request status:
  - Pending
  - Approved
  - Rejected
- View validator comments

---

# Validator Interface
- View all vacation requests
- Filter requests by status
- Approve vacation requests
- Reject vacation requests
- Add comments when rejecting

---

# Tech Stack

## Frontend
- Vue.js
- Vue Router
- Axios
- TailwindCSS
- TypeScript
- Vite

## Backend
- Node.js
- Express.js
- PostgreSQL
- TypeORM
- TypeScript
- dotenv

---

# Project Structure

```txt
vacation-management/

├── frontend/
├── backend/
└── README.md

Frontend Structure
frontend/src/
├── layouts/
├── router/
├── services/
├── views/
├── assets/
└── main.ts

Backend Structure
backend/src/
├── config/
├── controllers/
├── entities/
├── middleware/
├── routes/
├── tests/
└── index.ts

Installation
1. Clone Repository
git clone <repository_url>

2. Backend Setup
Go to backend folder
cd backend

Install dependencies
npm install

3. Create PostgreSQL Database
Create a PostgreSQL database named:
vacation_management

4. Backend Environment Variables
Inside the backend folder create:
.env

Add:
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=vacation_management

5. Start Backend Server
npm run dev
Backend runs on:
http://localhost:5000

6. Frontend Setup
Open a new terminal
cd frontend
Install dependencies
npm install

7. Frontend Environment Variables
Inside the frontend folder create:
.env
Add:
VITE_API_URL=http://localhost:5000/api

8. Start Frontend Server
npm run dev
Frontend runs on:
http://localhost:5173

Test Accounts

Requester Account
Email: requester@test.com
Password: 123456

Validator Account
Email: validator@test.com
Password: 123456

API Endpoints

Authentication
Sign Up
POST /api/auth/signup
Sign In
POST /api/auth/signin

Vacation Requests
Create Vacation Request
POST /api/vacations
Get All Vacation Requests
GET /api/vacations
Get User Vacation Requests
GET /api/vacations/user/:id
Approve / Reject Vacation Request
PATCH /api/vacations/:id

Validation & Error Handling

The backend includes:

Required field validation
Date validation
Status validation
Error handling
RESTful responses

Technical Decisions
TypeORM was used for clean entity management and relationships
TailwindCSS was used to rapidly build a responsive modern UI
Vue Router handles navigation between requester and validator interfaces
Axios centralizes API communication
PostgreSQL was chosen for relational database management
LocalStorage is used for session persistence
Role-based rendering is implemented for Requester and Validator dashboards

Tests

Basic test setup was implemented using Jest.
Run tests:
npm test

Known Limitations
Authentication is simplified for the technical assignment
Passwords are stored without hashing for simplicity
JWT/session authentication was not implemented

Notes
synchronize: true is enabled for development
Environment variables are excluded from Git using .gitignore
The database data persists between server restarts
The application is designed for local development and technical evaluation

Application Workflow

Requester
Create account or sign in
Submit vacation request
View request history and statuses

Validator
Sign in
View all vacation requests
Filter requests by status
Approve or reject requests
Add comments when rejecting

Author

Johana Benabou