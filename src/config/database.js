const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mubes_test',
  password: 'rayan',
  port: 5432,
});

module.exports = pool;

// Test connection
pool.on('connect', () => {
  console.log('Database connected successfully');
});

pool.on('error', (err) => {
  console.error('!Unexpected database error:', err);
});

module.exports = pool;