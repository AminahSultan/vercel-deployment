const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'project_react_postgres-1',
  password: '12345',
  port: 5432,
});

module.exports = pool;
