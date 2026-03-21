const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/add', productController.addProduct);
router.get('/all', productController.getAllProducts);

module.exports = router;

router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);
// Route to get stats
router.get('/stats', productController.getStats);