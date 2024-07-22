const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

// CRUD operations for sales
router.get('/sales', salesController.getAllSales);
router.get('/customers/:customerId/sales', salesController.getSalesByCustomerId);
router.post('/sales', salesController.createSale);
router.put('/sales/:id', salesController.updateSale);
router.delete('/sales/:id', salesController.deleteSale);

module.exports = router;
