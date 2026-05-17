# Vacation Management System

A full-stack vacation management application built with Vue.js, Node.js, PostgreSQL, and TypeORM.

---

# Features

## Requester Interface
- Submit vacation requests
- View vacation history
- Track request status

## Validator Interface
- View all vacation requests
- Filter requests by status
- Approve vacation requests
- Reject vacation requests with comments

---

# Tech Stack

## Frontend
- Vue.js
- Vue Router
- Axios
- TailwindCSS

## Backend
- Node.js
- Express.js
- PostgreSQL
- TypeORM

---

# Installation

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```txt
http://localhost:3000
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# Database Setup

Create a PostgreSQL database named:

```txt
vacation_management
```

Update database credentials inside:

```txt
backend/.env
```

Example:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=vacation_management
```

---

# API Endpoints

## Create Vacation Request

```http
POST /api/vacations
```

---

## Get All Vacation Requests

```http
GET /api/vacations
```

---

## Get User Vacation Requests

```http
GET /api/vacations/user/:id
```

---

## Approve / Reject Vacation Request

```http
PATCH /api/vacations/:id
```

---

# Technical Decisions

- TypeORM was used for clean entity management and relationships.
- TailwindCSS was used to rapidly build a responsive modern UI.
- Vue Router handles navigation between requester and validator interfaces.
- Axios centralizes API communication.
- PostgreSQL was chosen for relational database management.

---

# Tests

Basic test setup was implemented using Jest.

Run tests:

```bash
npm test
```

---

# Known Limitations

- Authentication is not implemented.
- User management is simplified for the technical assignment.

---

# Author

Johana Benabou