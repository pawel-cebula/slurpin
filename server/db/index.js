const { Pool } = require('pg');
const humps = require('humps');
const { PG_CONFIG } = require('../utils/config');
const pool = new Pool(PG_CONFIG);

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
