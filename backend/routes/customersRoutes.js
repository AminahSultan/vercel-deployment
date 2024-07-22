const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customerController');

// CRUD operations for customers
router.get('/customers', customersController.getAllCustomers);
router.get('/customers/:id', customersController.getCustomerById);
router.post('/customers', customersController.createCustomer);
router.put('/customers/:id', customersController.updateCustomer);
router.delete('/customers/:id', customersController.deleteCustomer);

module.exports = router;
