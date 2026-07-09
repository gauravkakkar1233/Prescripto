# Prescripto - Doctor Appointment Booking System

Prescripto is a modern, full-stack doctor appointment booking web application. It includes a user-facing platform, an admin/doctor management portal, and a secure backend API.

## Live Deployments

You can access the live version of the deployed services here:

*   **Frontend Patient Web App:** [https://prescripto-frontend-9sos.onrender.com](https://prescripto-frontend-9sos.onrender.com)
*   **Admin & Doctor Dashboard:** [https://prescripto-admin-kbaj.onrender.com](https://prescripto-admin-kbaj.onrender.com)
*   **Backend Server API:** [https://prescripto-nzba.onrender.com](https://prescripto-nzba.onrender.com)

## Project Structure

The project is structured as a monorepos/multi-package workspace:

*   **`backend/`**: Express.js & Node.js API with MongoDB (Mongoose), Cloudinary integration for image storage, and Razorpay for payment processing.
*   **`frontend/`**: Patient-facing React single-page application built with Vite and styled with CSS.
*   **`admin/`**: Dashboard application for administrators and doctors, built with Vite and React.

---

## Getting Started

Follow the instructions below to get your local environment set up.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v16+ recommended)
*   [MongoDB](https://www.mongodb.com/) (Local installation or MongoDB Atlas cluster)
*   Cloudinary Account (for image uploads)
*   Razorpay Account (for testing payment integration)

---

### Step 1: Environment Variables Setup

You will need to configure environment variables for all three packages. Each folder contains a `.env.example` file that you can use as a template.

#### 1. Backend (`backend/`)
Create a `.env` file in the `backend/` directory:
```bash
cp backend/.env.example backend/.env
```
Fill in the configuration parameters:
*   `MONGODB_URI`: Your MongoDB connection URI.
*   `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_SECRET_KEY`: Cloudinary storage credentials.
*   `ADMIN_EMAIL`, `ADMIN_PASSWORD`: Credentials used to log in to the admin panel.
*   `JWT_SECRET`: Secret key used for signing JWT login tokens.
*   `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`: Razorpay keys for payments.

#### 2. Frontend (`frontend/`)
Create a `.env` file in the `frontend/` directory:
```bash
cp frontend/.env.example frontend/.env
```
Set the parameters:
*   `VITE_BACKEND_URL`: The URL where the backend API is running (e.g., `http://localhost:8000`).
*   `VITE_RAZORPAY_KEY_ID`: Razorpay key for client checkout.

#### 3. Admin Portal (`admin/`)
Create a `.env` file in the `admin/` directory:
```bash
cp admin/.env.example admin/.env
```
Set the parameters:
*   `VITE_BACKEND_URL`: The URL where the backend API is running (e.g., `http://localhost:8000`).

---

### Step 2: Install Dependencies & Run

You must start the services in their respective folders:

#### Run Backend API
```bash
cd backend
npm install
npm run server
```

#### Run Frontend Client
```bash
cd frontend
npm install
npm run dev
```

#### Run Admin Dashboard
```bash
cd admin
npm install
npm run dev
```

---

## Main Tech Stack

*   **Frontend & Admin Panel:** React, Vite, TailwindCSS / CSS, React Router DOM, Axios
*   **Backend:** Node.js, Express.js, JWT Authentication, Multer & Cloudinary (File Uploads)
*   **Database:** MongoDB, Mongoose ORM
