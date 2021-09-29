const express = require('express');

const placesRouter = express.Router();
const db = require('../db');

placesRouter.get('/:placeId/checkins', async (req, res) => {
  const { placeId } = req.params;
  const checkins = await db.query('SELECT * FROM checkin WHERE place_id = $1', [
    placeId,
  ]);
  res.status(200).json(checkins.rows);
});

placesRouter.get('/:placeId', async (req, res) => {
  const { placeId } = req.params;
  const place = await db.query(
    `SELECT p.id, name, p.created_at, p.updated_at, COALESCE(json_agg(c) FILTER (WHERE c.place_id IS NOT NULL), '[]'::json) AS checkins
    FROM place p
    LEFT JOIN checkin c ON p.id = c.place_id
    WHERE p.id = $1
    GROUP BY p.id`,
    [placeId]
  );
  res.status(200).json(place.rows[0]);
});

placesRouter.put('/:placeId', async (req, res) => {
  const { placeId } = req.params;
  const { name } = req.body;
  const updatedPlace = await db.query(
    'UPDATE place SET name = $1 WHERE id = $2 RETURNING *',
    [name, placeId]
  );
  res.status(200).json(updatedPlace.rows[0]);
});

placesRouter.delete('/:placeId', async (req, res) => {
  const { placeId } = req.params;
  await db.query('DELETE FROM place WHERE id = $1', [placeId]);
  res.status(204).end();
});

placesRouter.get('/', async (req, res) => {
  const places = await db.query(
    `SELECT p.id, name, p.created_at, p.updated_at, COALESCE(json_agg(c) FILTER (WHERE c.place_id IS NOT NULL), '[]'::json) AS checkins
    FROM place p
    LEFT JOIN checkin c ON p.id = c.place_id
    GROUP BY p.id`
  );
  res.status(200).json(places.rows);
});

placesRouter.post('/', async (req, res) => {
  const { name } = req.body;
  const newPlace = await db.query(
    'INSERT INTO place(name) VALUES ($1) RETURNING *',
    [name]
  );
  res.status(201).json(newPlace.rows[0]);
});

module.exports = placesRouter;
