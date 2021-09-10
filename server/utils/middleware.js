const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' });
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Known database errors
  if (err.message.includes('resource not found')) {
    return res.status(404).json({ error: err.message });
  }

  if (err.code.startsWith('08')) {
    return res.status(503).json({ error: 'database connection issue' });
  }

  if (err.code === '22P02') {
    return res.status(400).json({ error: 'malformatted ID' });
  }

  if (err.code.startsWith('22')) {
    return res.status(400).json({ error: `data exception: ${err.message}` });
  }

  if (err.code.startsWith('23')) {
    return res
      .status(409)
      .json({ error: `constraint violation: ${err.message}` });
  }

  // Unknown database errors
  if (err.code && err.code.length === 5) {
    return res
      .status(500)
      .json({ error: `unknown database error: ${err.message}` });
  }

  return res
    .status(500)
    .json({ error: `unknown server error: ${err.message}` });
};

module.exports = { unknownEndpoint, errorHandler };
