# Full Stack To-Do Application

A simple to-do list application with user authentication (JWT), built with **Node.js**, **Express**, **MongoDB**, and **Vite + React**. Users can sign up, log in, and manage their tasks (create, read, update, and delete). Each user only has access to their own tasks.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)

---

## Features

- **User Authentication**: Register and log in using username, email, and password. JWT-based session management.
- **Task Management**: Create, read, update, and delete tasks. Mark tasks as completed (lined out).
- **Responsive UI**: Built with Material‑UI for a modern, mobile-friendly interface.
- **Validation & Error Handling**: Server-side validation with express-validator and client-side validation in React.

---

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Frontend**: Vite + React, Material‑UI, React Router
- **Authentication**: JSON Web Tokens (JWT)
- **Testing**: Jest, Supertest (backend); React Testing Library (frontend)

---

## Prerequisites

- **Node.js** (v14+ recommended)
- **npm** or **yarn**
- **MongoDB** (local or hosted)

Create a `.env` file in the backend folder with:

MONGO_URL = mongodb+srv://bibaveatharva09:aths2002@cluster0.pdb66lv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0PORT=5001

## Installation
```bash
Set Up the Backend
a. Navigate to the backend folder:

cd backend

b. Install backend dependencies:

npm install

c. Create a .env file in the backend/ folder.

d. Starting Backend:
npm start

Set Up the Frontend
a. Navigate to the frontend folder:
cd frontend/viteproject
b. Install frontend dependencies:
npm install

c. Starting Frontend:
npm run dev
