const { Pool } = require('pg');
const humps = require('humps');

// takes user, host, database, password, port from .env
const pool = new Pool();

module.exports = {
  query: async (text, params) => {
    const response = await pool.query(text, params);
    if (response.command !== 'DELETE' && response.rows.length === 0) {
      throw new Error('resource not found in the database');
    }
    response.rows = response.rows.map((row) => humps.camelizeKeys(row));
    return response;
  },
};
