const pool = require('../db');

// Fetch all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM customer');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fetch customer by ID
exports.getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM customer WHERE customer_id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching customer by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new customer
exports.createCustomer = async (req, res) => {
  const { name, email } = req.body;
  try {
    const { rows } = await pool.query('INSERT INTO customer (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a customer by ID
exports.updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const { rows } = await pool.query('UPDATE customer SET name = $1, email = $2 WHERE customer_id = $3 RETURNING *', [name, email, id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a customer by ID
exports.deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('DELETE FROM customer WHERE customer_id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
