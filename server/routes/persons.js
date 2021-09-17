const express = require('express');

const personsRouter = express.Router();
const db = require('../db');

personsRouter.get('/:personId/likes', async (req, res) => {
  const { personId } = req.params;
  const likes = await db.query(
    `SELECT checkin_id FROM checkin_like WHERE person_id = $1`,
    [personId]
  );
  res.status(200).json(likes.rows.map((c) => c.checkinId));
});

personsRouter.get('/:personId', async (req, res) => {
  const { personId } = req.params;
  const person = await db.query(
    `SELECT p.id, username, email, COALESCE(json_agg(c) FILTER (WHERE c.person_id IS NOT NULL), '[]'::json) AS checkins
    FROM person p
    LEFT JOIN checkin c ON p.id = c.person_id
    WHERE p.id = $1
    GROUP BY p.id`,
    [personId]
  );
  res.status(200).json(person.rows[0]);
});

personsRouter.patch('/:personId', async (req, res) => {
  const { personId } = req.params;
  console.log('req.person in route', req.person);
  if (req.person.id !== personId) {
    return res.status(403).json({ error: 'unauthorized access' });
  }
  const { username, email } = req.body;
  const updatedPerson = await db.query(
    'UPDATE person SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email',
    [username, email, personId]
  );
  res.status(200).json(updatedPerson.rows[0]);
});

personsRouter.delete('/:personId', async (req, res) => {
  const { personId } = req.params;
  if (req.person.id !== personId) {
    return res.status(403).json({ error: 'unauthorized access' });
  }
  await db.query('DELETE FROM person WHERE id = $1', [personId]);
  res.status(204).end();
});

personsRouter.get('/', async (req, res) => {
  const persons = await db.query(
    `SELECT p.id, username, email, COALESCE(json_agg(c) FILTER (WHERE c.person_id IS NOT NULL), '[]'::json) AS checkins
    FROM person p
    LEFT JOIN checkin c ON p.id = c.person_id
    GROUP BY p.id`
  );
  res.status(200).json(persons.rows);
});

personsRouter.post('/', async (req, res) => {
  const { username, email } = req.body;
  const newPerson = await db.query(
    'INSERT INTO person(username, email) VALUES ($1, $2) RETURNING *',
    [username, email]
  );
  res.status(201).json(newPerson.rows[0]);
});

module.exports = personsRouter;
