const jwt = require('jsonwebtoken');
const db = require('../db');

const authToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
    return res
      .status(403)
      .json({ error: 'authorization token missing or malformatted' });
  }

  const token = authHeader.slice(7);

  const person = await jwt.verify(token, process.env.JWT_SECRET);

  if (!person) {
    return res.status(403).json({ error: 'invalid token' });
  }

  req.person = person;

  next();
};

const userPersonMatch = async (req, res, next) => {
  const { personId: paramPersonId } = req.params;
  const { id: reqPersonId } = req.person;

  if (paramPersonId !== reqPersonId) {
    return res.status(403).json({
      error:
        'Unauthorized access - you cannot modify the profile of another user',
    });
  }

  next();
};

const userCheckinMatch = async (req, res, next) => {
  const { checkinId } = req.params;
  const { id: userId } = req.person;

  const checkin = await db.query(
    'SELECT id, person_id FROM checkin WHERE id = $1',
    [checkinId]
  );

  if (checkin.rows[0].personId !== userId) {
    return res
      .status(403)
      .json({ error: 'You cannot delete the checkin of another user' });
  }

  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' });
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Known database errors
  if (err.message.includes('resource not found')) {
    return res.status(404).json({ error: err.message });
  }

  if (err.code) {
    if (err.code.startsWith('08')) {
      return res.status(503).json({ error: 'database connection issue' });
    }

    if (err.code === '22P02') {
      return res.status(400).json({ error: 'malformatted ID' });
    }

    if (err.code.startsWith('22')) {
      return res.status(400).json({ error: `data exception: ${err.message}` });
    }

    if (err.code === '23505') {
      if (err.message.includes('person_email_key')) {
        return res.status(409).json({ error: 'duplicate email' });
      }
      if (err.message.includes('person_username_key')) {
        return res.status(409).json({ error: 'duplicate username' });
      }
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
  }

  // Unknown server errors
  return res
    .status(500)
    .json({ error: `unknown server error: ${err.message}` });
};

module.exports = {
  authToken,
  userPersonMatch,
  userCheckinMatch,
  unknownEndpoint,
  errorHandler,
};
