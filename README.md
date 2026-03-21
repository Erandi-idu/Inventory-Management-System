# 📦 Inventory & Sales Management System

A professional Full-Stack Inventory and Sales Management System built with **React, Node.js, and MySQL**. This application allows users to manage products, track sales transactions, and monitor stock levels in real-time through an interactive dashboard.

## 🚀 Key Features

- **Interactive Dashboard:** Real-time overview of total products, total revenue, and low-stock alerts.
- **Inventory Management:** Full CRUD operations (Create, Read, Update, Delete) for managing products.
- **Sales Tracking:** Record sales with automatic stock deduction and total price calculation.
- **Stock Alerts:** Visual indicators for items running low on stock (less than 5 units).
- **Responsive UI:** Clean, modern, and mobile-friendly interface built with **Tailwind CSS**.
- **Data Persistence:** Relational database management using **MySQL**.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS
- **Icons:** Lucide-React
- **HTTP Client:** Axios
- **Routing:** React Router DOM

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **Environment Management:** Dotenv
- **CORS:** Enabled for cross-origin requests

## 📂 Project Structure

```text
inventory-system/
├── backend/            # Express API & Database Connection
│   ├── config/         # DB Connection setup
│   ├── controllers/    # Business logic (Products & Sales)
│   ├── routes/         # API Endpoints
│   └── server.js       # Main Entry point
├── frontend/           # React App (Vite)
│   ├── src/
│   │   ├── api/        # Axios configuration
│   │   ├── components/ # Common UI components (Navbar)
│   │   ├── pages/      # Application Screens
│   │   └── App.jsx     # Main Router setup
└── README.md           # Documentation

⚙️ Installation & Setup
1. Database Setup
Open phpMyAdmin, create a database named inventory_db, and run the following SQL queries:
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    quantity_sold INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO categories (name) VALUES ('Electronics');

2. Backend Setup

cd backend
npm install
# Create a .env file with your DB details (DB_HOST, DB_USER, etc.)
npm run dev

3. Frontend Setup

cd frontend
npm install
npm run dev

👩‍💻 Author
Erandi Indunil
GitHub Profile
LinkedIn Profile

