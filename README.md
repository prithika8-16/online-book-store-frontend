# Online Book Store – Frontend

A responsive and user-friendly **Online Book Store** frontend built with React and Vite. The application provides book browsing, authentication, cart management, checkout, order tracking, and an admin dashboard.

## 🚀 Features

* User registration and login
* JWT-based authentication
* Browse and search books
* View book details
* Add books to cart
* Update and remove cart items
* Checkout and place orders
* View order confirmation
* View previous orders
* Admin dashboard
* Add, update, and manage books
* Responsive and modern user interface
* REST API integration using Axios
* Protected user and admin routes

## 🛠️ Technologies Used

* React
* Vite
* JavaScript
* HTML5
* CSS3
* Tailwind CSS
* Axios
* React Router
* Lucide React

## 📁 Project Structure

```text
src/
├── components/
│   ├── AdminRoute.jsx
│   ├── Navbar.jsx
│   └── ProtectedRoute.jsx
│
├── pages/
│   ├── AdminBooks.jsx
│   ├── AdminDashboard.jsx
│   ├── Books.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── MyOrders.jsx
│   ├── OrderConfirmation.jsx
│   └── Register.jsx
│
├── services/
│   └── api.js
│
├── assets/
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## ⚙️ Backend Integration

This frontend communicates with the Spring Boot backend through REST APIs.

The backend runs locally on:

```text
http://localhost:8081
```

The frontend runs locally on:

```text
http://localhost:5173
```

Backend repository:

**Online Book Store Backend**

https://github.com/prithika8-16/online-book-store-backend

## ▶️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/prithika8-16/online-book-store-frontend.git
```

### 2. Navigate to the project

```bash
cd online-book-store-frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:5173
```

## 🔐 Authentication

The application uses JWT authentication provided by the Spring Boot backend.

Different access levels are supported:

* **USER** – Browse books, manage cart, place orders, and view orders.
* **ADMIN** – Manage books and access the admin dashboard.

## 🛒 Application Flow

```text
Register
   ↓
Login
   ↓
Browse Books
   ↓
Add to Cart
   ↓
Checkout
   ↓
Place Order
   ↓
Order Confirmation
   ↓
My Orders
```

## 📌 Related Project

This frontend is part of a full-stack Online Book Store application.

**Backend:** Java + Spring Boot + MySQL + JWT
**Frontend:** React + Vite + Tailwind CSS

## 👩‍💻 Author

**S Prithika**

B.Tech – Electronics and Communication Engineering

GitHub: https://github.com/prithika8-16
