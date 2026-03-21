const db = require('../config/db');

// 1.  (Add Sale)
exports.addSale = async (req, res) => {
    try {
        const { product_id, quantity_sold } = req.body;

        // මුලින්ම බලනවා මේ බඩුවේ දැනට තියෙන ප්‍රමාණය සහ මිල කීයද කියලා
        const [product] = await db.query('SELECT price, stock_quantity FROM products WHERE id = ?', [product_id]);

        if (product.length === 0) {
            return res.status(404).json({ message: "Product not found!" });
        }

        const current_stock = product[0].stock_quantity;
        const price = product[0].price;

        // බඩු ඇති තරම් තිබේදැයි බලමු
        if (current_stock < quantity_sold) {
            return res.status(400).json({ message: "Not enough stock available!" });
        }

        const total_price = price * quantity_sold;

        // 1. Sales Table එකට දත්ත ඇතුළත් කිරීම
        await db.query(
            'INSERT INTO sales (product_id, quantity_sold, total_price) VALUES (?, ?, ?)',
            [product_id, quantity_sold, total_price]
        );

        // 2. Products Table එකේ Stock එක අඩු කිරීම
        await db.query(
            'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?',
            [quantity_sold, product_id]
        );

        res.status(201).json({ message: "Sale recorded and stock updated!", total_price });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. සියලුම විකුණුම් බැලීම (Get All Sales)
exports.getAllSales = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT sales.id, products.name, sales.quantity_sold, sales.total_price, sales.sale_date 
            FROM sales 
            JOIN products ON sales.product_id = products.id
            ORDER BY sales.sale_date DESC
        `);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};