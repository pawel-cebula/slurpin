const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();
const db = require('../db');

authRouter.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (password.length < 8) {
    return res
      .status(403)
      .json({ error: 'password should have at least 8 characters' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newPerson = await db.query(
    `INSERT INTO person(username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email`,
    [username, email, passwordHash]
  );

  // remove password hash from response?
  res.status(201).json(newPerson.rows[0]);
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const person = await db.query(`SELECT * FROM person WHERE email = $1;`, [
    email,
  ]);

  const passwordCorrect = await bcrypt.compare(
    password,
    person.rows[0].password
  );

  if (!(person && passwordCorrect)) {
    return res.status(401).json({ error: 'invalid username or password' });
  }

  const personForToken = {
    email,
    username: person.rows[0].username,
    id: person.rows[0].id,
  };

  const token = await jwt.sign(personForToken, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  return res.status(200).json({ ...personForToken, token });
});

module.exports = authRouter;
