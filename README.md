# 🏥 Doctor Appointment System

A full-stack **Doctor Appointment Booking System** that allows users to book appointments, doctors to manage schedules, and admins to control the entire platform.

---

## 🚀 Features

### 👤 User Panel

* Register & Login securely (JWT Authentication)
* Browse doctors by specialization
* Book appointments with available time slots
* Online payment integration using Razorpay (Test Mode)
* View & manage appointments
* Update profile & upload image

### 🩺 Doctor Panel

* View assigned appointments
* Manage availability
* Update profile details
* Doctor dashboard with appointment overview
* Track patient bookings

### 🛠️ Admin Panel

* Add & manage doctors with image upload (via Cloudinary)
* View all appointments
* Monitor system activity
* Role-based access control
* Secure admin login
* Manage doctor availability
* View all doctors

---

## 🧠 What This Project Does

This system simulates a real-world hospital appointment platform:

*Patients can discover doctors and book slots
*Doctors can manage their schedule and patients
*Admin controls the entire system (CRUD operations + monitoring)

It demonstrates:

*Full-stack development (Frontend + Backend)
*Authentication & Authorization
*Payment gateway integration
*Real-time data handling with MongoDB

It follows a **3-tier architecture**:

* **Frontend (React)** → UI for users/admin/doctors
* **Backend (Node.js + Express)** → API & business logic
* **Database (MongoDB)** → Stores users, doctors, appointments

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Context API
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Other Tools

* JWT Authentication
* Razorpay (Payments)
* Cloudinary (Image Upload)

---

## 📁 Project Structure

```
Doctors-Appointment-System/
│
├── admin/
│   └── src/
│       ├── components/
│       ├── context/
│       └── pages/
│           ├── Admin/
│           ├── Doctor/
│           └── Login.jsx
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── context/
│       └── pages/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in both **frontend** and **backend**.

### Backend `.env`

```
MONGODB_URI=your_mongodb_uri
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret_key
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret
CURRENCY=INR
```

### Frontend `.env`

```
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_key
```

---

## 🧪 Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/your-username/Doctors-Appointment-System.git
cd Doctors-Appointment-System
```

### 2️⃣ Install Dependencies

#### Backend

cd backend
npm install
npm run server

#### Frontend

cd frontend
npm install
npm run dev

#### Admin Panel

cd admin
npm install
npm run dev

### 3️⃣ Run Project

#### Start Backend

```
cd backend
npm run server
```

#### Start Frontend

```
cd frontend
npm run dev

#### Start Admin Panel

```
cd admin
npm run dev

## 🌐 URLs

* Frontend: http://localhost:5173
* Admin Panel: http://localhost:5174
* Backend: http://localhost:4000

## 🔐 Authentication

* JWT-based authentication
* Role-based access:

  * User
  * Doctor
  * Admin

## 💳 Payment Integration

* Integrated with Razorpay
* Supports secure online payments
* Handles booking confirmation after payment

## ☁️ Image Upload

* Cloudinary used for:

  * Doctor profile images
  * Optimization & storage
## 📌 Future Improvements

* Email/SMS notifications
*Real-time chat between doctor & patient
* Doctor ratings & reviews
* Appointment reminders
* Multi-language support

## 👨‍💻 Author

Arti Giram
Full Stack Developer | AI & Data Science Student

## ⭐ Show Your Support

If you like this project:

* ⭐ Star the repo
* 🛠️ Contribute
