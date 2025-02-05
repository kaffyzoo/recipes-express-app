const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOSTNAME,
  port: process.env.PG_PORT, // default Postgres port
  database: process.env.PG_DATABASE,
  ssl: true,
});


module.exports = {
  query: (text, params) => pool.query(text, params)
};
