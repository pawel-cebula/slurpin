const express = require('express');

const checkinsRouter = express.Router();
const db = require('../db');

checkinsRouter.put('/:checkin_id/like', async (req, res) => {
  const checkinId = req.params.checkin_id;
  const { personId } = req.body;
  const checkinLike = await db.query(
    'INSERT INTO checkin_like (checkin_id, person_id) VALUES ($1, $2) RETURNING *',
    [checkinId, personId]
  );
  res.status(200).json({ ...checkinLike.rows[0] });
});

checkinsRouter.delete('/:checkin_id/like', async (req, res) => {
  const checkinId = req.params.checkin_id;
  const { personId } = req.body;
  await db.query(
    'DELETE FROM checkin_like WHERE checkin_id = $1 AND person_id = $2',
    [checkinId, personId]
  );
  res.status(204).end();
});

checkinsRouter.get('/:checkin_id', async (req, res) => {
  const checkin = await db.query(
    `SELECT c.id, bowl, rating, review, likes, c.created_at, c.updated_at, place_id, name AS place_name, person_id, username AS person_username
    FROM checkin c 
    LEFT JOIN place ON c.place_id = place.id
    LEFT JOIN person ON c.person_id = person.id
    WHERE c.id = $1;`,
    [req.params.checkin_id]
  );
  res.status(200).json({ ...checkin.rows[0] });
});

checkinsRouter.put('/:checkin_id', async (req, res) => {
  const { rating, review, bowl } = req.body;
  const updatedCheckin = await db.query(
    'UPDATE checkin SET rating = $1, review = $2, bowl = $3 WHERE id = $4 RETURNING *',
    [rating, review, bowl, req.params.checkin_id]
  );
  res.status(200).json({ ...updatedCheckin.rows[0] });
});

checkinsRouter.delete('/:checkin_id', async (req, res) => {
  await db.query('DELETE FROM checkin WHERE id = $1', [req.params.checkin_id]);
  res.status(204).end();
});

checkinsRouter.get('/', async (req, res) => {
  const checkins = await db.query(
    `SELECT c.id, bowl, rating, review, likes, c.created_at, c.updated_at, place_id, name AS place_name, person_id, username AS person_username
    FROM checkin c 
    LEFT JOIN place ON c.place_id = place.id
    LEFT JOIN person ON c.person_id = person.id
    ORDER BY c.created_at DESC;`
  );
  res.status(200).json(checkins.rows);
});

checkinsRouter.post('/', async (req, res) => {
  const { bowl, rating, review, place_id, person_id } = req.body;
  const newCheckin = await db.query(
    'INSERT INTO checkin(bowl, rating, review, place_id, person_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [bowl, rating, review, place_id, person_id]
  );
  res.status(201).json({ ...newCheckin.rows[0] });
});

module.exports = checkinsRouter;
