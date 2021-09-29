require('dotenv').config();

const PORT = process.env.PORT || 3000;

const database =
  process.env.NODE_ENV === 'test'
    ? process.env.PGDATABASE_TEST
    : process.env.PGDATABASE;

const PG_CONFIG = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};

module.exports = {
  PORT,
  PG_CONFIG,
};
