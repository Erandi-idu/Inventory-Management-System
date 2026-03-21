const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


db.query('SELECT 1')
    .then(() => {
        console.log('MySQL Database Connected Successfully!');
    })
    .catch(err => {
        console.log('Database Connection Failed: ' + err);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);


const salesRoutes = require('./routes/salesRoutes');


app.use('/api/sales', salesRoutes);