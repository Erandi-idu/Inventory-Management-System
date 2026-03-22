# 📦 Inventory & Sales Management System

Full-stack Inventory and Sales Management System built with React, Node.js, and MySQL.

## 🚀 Key Features
- Dashboard with real-time stats
- Product Add/View/Update/Delete
- Sales tracking and automatic stock update
- Responsive UI with Tailwind CSS

## 🛠️ Tech Stack
- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MySQL

## 📂 Project Structure
- backend: Express API & MySQL setup
- frontend: React App (Vite)
- README.md: Documentation

## ⚙️ Installation & Setup

### 1. Database Setup
Open phpMyAdmin, create a database named `inventory_db`, and run these queries:

```sql
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
```

### 2. Backend Setup
- `cd backend`
- `npm install`
- `npm run dev`

### 3. Frontend Setup
- `cd frontend`
- `npm install`
- `npm run dev`

---

## 👩‍💻 Author
**Erandi Indunil**  
- [GitHub Profile](https://github.com/Erandi-idu)
- [LinkedIn Profile](https://www.linkedin.com/in/erandi-indunil)
