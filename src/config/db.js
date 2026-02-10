const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Database connection failed:", err.message);
  }
  console.log("Database connected successfully");
  release();
});

module.exports = pool;
