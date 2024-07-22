const pool = require('../db');

// Fetch all sales
exports.getAllSales = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM sales');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fetch sales by customer ID
exports.getSalesByCustomerId = async (req, res) => {
  const { customerId } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM sales WHERE customer_id = $1', [customerId]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching sales by customer ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new sale
exports.createSale = async (req, res) => {
  const { product, amount, customer_id } = req.body;
  try {
    const { rows } = await pool.query('INSERT INTO sales (product, amount, customer_id) VALUES ($1, $2, $3) RETURNING *', [product, amount, customer_id]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating sale:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a sale by ID
exports.updateSale = async (req, res) => {
  const { id } = req.params;
  const { product, amount, customer_id } = req.body;
  try {
    const { rows } = await pool.query('UPDATE sales SET product = $1, amount = $2, customer_id = $3 WHERE id = $4 RETURNING *', [product, amount, customer_id, id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Sale not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating sale:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a sale by ID
exports.deleteSale = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('DELETE FROM sales WHERE id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Sale not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting sale:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getWeeklySalesByCustomerId = async (req, res) => {
    const { customerId, start, end } = req.query;
    try {
      const query = `
        SELECT 
          DATE_TRUNC('week', sale_date) AS week_start,
          SUM(amount) AS total_sales
        FROM sales
        WHERE customer_id = $1 AND sale_date >= $2 AND sale_date <= $3
        GROUP BY week_start
        ORDER BY week_start
      `;
      const { rows } = await pool.query(query, [customerId, start, end]);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching weekly sales by customer ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Fetch yearly sales by customer ID
  exports.getYearlySalesByCustomerId = async (req, res) => {
    const { customerId, start, end } = req.query;
    try {
      const query = `
        SELECT 
          DATE_TRUNC('year', sale_date) AS year_start,
          SUM(amount) AS total_sales
        FROM sales
        WHERE customer_id = $1 AND sale_date >= $2 AND sale_date <= $3
        GROUP BY year_start
        ORDER BY year_start
      `;
      const { rows } = await pool.query(query, [customerId, start, end]);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching yearly sales by customer ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };