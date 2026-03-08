

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
  
### 🛍 Product Management
- Product Listing
- Product Images Upload
- Cloudinary Media Storage
- Stock & Price Handling

### 🔐 Security & Payments
- Password Hashing with bcrypt
- JWT-based Authentication
- Secure Cookie Handling
- Stripe Checkout Integration

> GreenCart is built as a **real-world e-commerce system**, not a UI-only demo.

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

carrental/
│
├── client/                     # Frontend (React + Vite)
│   ├── node_modules/           # Project dependencies
│   ├── public/                 # Static files
│   │
│   ├── src/                    # Main source folder
│   │   ├── assets/             # Images, icons, and static assets
│   │   ├── components/         # Reusable React components
│   │   ├── context/            # Global state management (React Context)
│   │   ├── pages/              # Application pages
│   │   │
│   │   ├── App.jsx             # Main App component
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Global styles
│   │
│   ├── .env                    # Frontend environment variables
│   ├── .gitignore              # Git ignored files
│   ├── eslint.config.js        # ESLint configuration
│   ├── index.html              # Root HTML file
│   ├── package.json            # Frontend dependencies
│   ├── README.md               # Frontend documentation
│   ├── vercel.json             # Vercel deployment config
│   └── vite.config.js          # Vite configuration
│
├── server/                     # Backend (Node.js + Express)
│   ├── configs/                # Database and external service configurations
│   ├── controllers/            # Business logic for APIs
│   ├── middleware/             # Authentication and custom middleware
│   ├── models/                 # MongoDB schemas (Mongoose)
│   ├── routes/                 # API route definitions
│   ├── node_modules/           # Backend dependencies
│   │
│   ├── .env                    # Backend environment variables
│   ├── .gitignore              # Git ignored files
│   ├── package.json            # Backend dependencies
│   ├── package-lock.json       # Dependency lock file
│   └── server.js               # Main backend entry point
│
└── README.md                   # Project documentation

```

---

## 🧠 How Car Rantel Works

### 🔐 Authentication
- Passwords hashed using **bcrypt**
- JWT tokens stored in **HTTP-only cookies**
- Protected routes using middleware

### Cars Data
- Product data stored in MongoDB
- Images uploaded using **Multer**
- Media hosted on **ImageKit**


---

## 👤 User APIs
These APIs handle user registration, login, and user-related operations.
| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| POST   | `/api/user/register` | Register a new user        |
| POST   | `/api/user/login`    | Login user                 |
| GET    | `/api/user/profile`  | Get logged-in user profile |


## 🚗 Owner APIs
These APIs allow car owners/admins to manage cars in the system.

| Method | Endpoint                    | Description                 |
| ------ | --------------------------- | --------------------------- |
| POST   | `/api/owner/add-car`        | Add a new car               |
| GET    | `/api/owner/cars`           | Get all cars added by owner |
| PUT    | `/api/owner/update-car/:id` | Update car details          |
| DELETE | `/api/owner/delete-car/:id` | Delete a car                |

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
# ImageKit
##################################
IMAGEKIT_PUBLIC_KEY = your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY = your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT = your_imagekit_url_endpoint
##################################


```

⚠️ Never commit `.env` files to GitHub.

---

## 🚀 Getting Started

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

---

## 📈 Future Improvements

- Admin Dashboard
- Add new cars
- Update car details
-Delete cars
- View all bookings
- Manage cars
- Role-based Access (Admin / User)

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

