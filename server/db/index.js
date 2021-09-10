const { Pool } = require('pg');

// takes user, host, database, password, port from .env
const pool = new Pool();

module.exports = {
  query: async (text, params) => {
    const response = await pool.query(text, params);
    console.log(response);
    if (response.command !== 'DELETE' && response.rows.length === 0) {
      throw new Error('resource not found in the database');
    }
    return response;
  },
};
