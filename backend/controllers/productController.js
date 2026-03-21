const db = require('../config/db');


exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, stock_quantity, category_id } = req.body;
        
        const [result] = await db.query(
            'INSERT INTO products (name, description, price, stock_quantity, category_id) VALUES (?, ?, ?, ?, ?)',
            [name, description, price, stock_quantity, category_id]
        );

        res.status(201).json({ message: "Product Added Successfully!", productId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAllProducts = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. update a product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock_quantity, category_id } = req.body;
        
        await db.query(
            'UPDATE products SET name=?, description=?, price=?, stock_quantity=?, category_id=? WHERE id=?',
            [name, description, price, stock_quantity, category_id, id]
        );

        res.status(200).json({ message: "Product Updated Successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM products WHERE id=?', [id]);
        res.status(200).json({ message: "Product Deleted Successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Getting the statistics needed for the dashboard
exports.getStats = async (req, res) => {
    try {
        // 1. Total quantity (Count)
        const [totalProducts] = await db.query('SELECT COUNT(*) as count FROM products');
        
        // 2. Total sales (Sum of total_price)
        const [totalSales] = await db.query('SELECT SUM(total_price) as sum FROM sales');
        
        // 3. Low stock count (Stock < 5)
        const [lowStock] = await db.query('SELECT COUNT(*) as count FROM products WHERE stock_quantity < 5');

        res.status(200).json({
            totalProducts: totalProducts[0].count,
            totalSales: totalSales[0].sum || 0,
            lowStock: lowStock[0].count
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};