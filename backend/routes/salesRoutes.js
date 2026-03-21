const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.post('/add', salesController.addSale);
router.get('/all', salesController.getAllSales);

module.exports = router;