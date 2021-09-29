require('dotenv').config();

const PORT = process.env.PORT || 3000;

const devConfig = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};

const testConfig = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE_TEST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};

const prodConfig = {
  connectionString: process.env.DATABASE_URL,
};

const PG_CONFIG =
  process.env.NODE_ENV === 'production'
    ? prodConfig
    : process.env.NODE_ENV === 'test'
    ? testConfig
    : devConfig;

module.exports = {
  PORT,
  PG_CONFIG,
};
