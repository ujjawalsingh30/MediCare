

# 🏥 Medicare - Doctor Appointment Booking System

<p align="center">
  <img src="./client/public/home.png" alt="Car Rental Homepage Screenshot" width="800"/>
</p>
Medicare is a full-stack healthcare web application that allows patients to search doctors, book appointments, and manage bookings online. The platform also provides an admin dashboard to manage doctors and appointments efficiently. It is built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

<hr/>

🌐 **Live Website:** https://car-rental-gamma-lime.vercel.app/

📦 **Repository:** https://github.com/ujjawalsingh30/CarRental

---

## ✨ Features

### 👨‍⚕️ Patient Features
* Register and login securely
* Browse available doctors
* Search doctors by specialization
* Book doctor appointments
* View and manage appointment history
* Responsive and user-friendly UI
  
### 🧑‍💼 Admin Features
* Admin dashboard
* Add / remove doctors
* Manage appointments
* View patient bookings
* Monitor platform activity

### 💻 System Features
* Secure authentication
* RESTful API architecture
* Responsive design
* Image upload support
* Real-time appointment management

---

## 🛠 Tech Stack

### 🌐 Frontend

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=ffffff)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=ffffff)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=ffffff)
![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=ffffff)
![React Hot Toast](https://img.shields.io/badge/React_Hot_Toast-FF5722?logo=react&logoColor=ffffff)

---

### 🖥 Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=ffffff)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=ffffff)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=ffffff)
![Mongoose](https://img.shields.io/badge/Mongoose-888888?logo=mongodb&logoColor=ffffff)
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=ffffff)


---

### 🔌 Utilities & Services


![Multer](https://img.shields.io/badge/Multer-FF6F00?logo=node.js&logoColor=ffffff)
![bcrypt](https://img.shields.io/badge/bcrypt-4285F4?logo=bcrypt&logoColor=ffffff)
![dotenv](https://img.shields.io/badge/dotenv-000000?logo=dotenv&logoColor=ffffff)
![CORS](https://img.shields.io/badge/CORS-FF6347?logo=cors&logoColor=ffffff)

---

## 📁 Project Structure

```

MEDICARE
│
├── admin                # Admin Panel (React + Vite)
│   ├── node_modules
│   ├── public
│   ├── src
│   │   ├── assets       # Images, icons, static files
│   │   ├── components   # Reusable UI components
│   │   ├── pages        # Admin pages (Dashboard, Doctors, Appointments)
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── vercel.json
│   └── vite.config.js
│
├── backend              # Node.js + Express Backend
│   ├── config           # Database and cloud configuration
│   ├── controllers      # Business logic
│   ├── middlewares      # Authentication middleware
│   ├── models           # MongoDB models
│   ├── routes           # API routes
│   ├── upload           # Uploaded images/files
│   ├── utils            # Helper functions
│   │
│   ├── node_modules
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend             # User Panel (React + Vite)
│   ├── node_modules
│   ├── public
│   ├── src
│   │   ├── assets       # Images and icons
│   │   ├── components   # Reusable components
│   │   ├── doctor       # Doctor related UI
│   │   ├── pages        # User pages
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── VerifyPaymentPage.jsx
│   ├── VerifyServicePaymentPage.jsx
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── vercel.json
│   └── vite.config.js
│
└── README.md
```

---

## 🧠 How Car Rantel Works

### 🔐 Authentication
- Passwords hashed using **bcrypt**
- JWT tokens stored in **HTTP-only cookies**
- Protected routes using middleware

### Doctors Data
- Product data stored in MongoDB
- Images uploaded using **Multer**
- Media hosted on **Cloudinary**

---

## ⚙️ Environment Variables

Create a `.env` file inside **server/**:

```

##################################
# Database
##################################
MONGO_URI=your_mongodb_connection_string

##################################
# Authentication
##################################
JWT_SECRET=your_jwt_secret

##################################
# Cloudinary
##################################
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret_key
##################################


```

⚠️ Never commit `.env` files to GitHub.

---

## 🚀 Getting Started

### Admin

```
cd Admin
npm install
npm run dev
```


### Backend
```
cd server
npm install
npm run server 
```

### Frontend
```
cd client
npm install
npm run dev
```

## 📈 Future Improvements

* Online payment integration
* Doctor availability scheduling
* Email appointment notifications
* Mobile application support

---

## Project Screenshots

🗂 Cars

This page displays all available cars for rent in a card-based layout. Each card shows important details such as
* Car brand and model
* Rental price per day
* Seating capacity
* Transmission type
* Fuel type
* Location
<p align="center">
  <img src="./client/public/cars.png" alt="Car Rental Homepage Screenshot" width="800"/>
</p

🛒 My-Booking

The My Bookings page allows users to track all their reservations. It shows:
* Booking ID
* Rental period
* Pickup location
* Booking status (Pending / Confirmed / Cancelled)
* Total price
  This helps users easily manage and review their bookings.
<p align="center">
  <img src="./client/public/My-Booking.png" alt="Car Rental Homepage Screenshot" width="800"/>
</p>

🛍 Admin-Dashboard

The Admin Dashboard provides an overview of the platform's activity including:
* Total number of cars
* Total bookings
* Pending requests
* Confirmed bookings
* Recent booking activities
* Monthly revenue
It helps administrators monitor platform performance efficiently.
<p align="center">
  <img src="./client/public/Admin Dashboad.png" alt="Car Rental Homepage Screenshot" width="800"/>
</p>



➕ Add New Car

Admins can add new vehicles to the platform by filling in detailed information such as:
* Brand and model
* Year of manufacture
* Daily rental price
* Transmission type
* Fuel type
* Seating capacity
* Location
* Vehicle description
* Car image upload
This ensures that all necessary vehicle details are available for customers.
<p align="center">
  <img src="./client/public/Add Car.png" alt="Car Rental Homepage Screenshot" width="800"/>
</p>


📋 Manage Bookings

The Manage Bookings section allows administrators to control all customer reservations. Admins can:
* View all booking records
* Check payment status
* Approve or cancel bookings
* Update booking status
This functionality ensures smooth booking management for the platform.
<p align="center">
  <img src="./client/public/Managed-Booking.png" alt="Car Rental Homepage Screenshot" width="800"/>
</p>

---

## 🏁 Conclusion

**CarRental** is a production-style vehicle booking platform built with the MERN stack, featuring user authentication, car management, booking functionality, and secure backend APIs.

