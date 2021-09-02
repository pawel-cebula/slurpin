const express = require('express');
const placesRouter = express.Router();
const db = require('../db');

placesRouter.get('/:place_id/checkins', async (req, res) => {
  const checkins = await db.query(
    'SELECT * FROM checkin WHERE place_id = $1',
    [req.params.place_id]
  );
  res.status(200).json(checkins.rows);
});

placesRouter.get('/:place_id', async (req, res) => {
  const place = await db.query(
    // 'SELECT * FROM place WHERE id = $1',
    `SELECT p.id, name, COALESCE(json_agg(c) FILTER (WHERE c.place_id IS NOT NULL), '[]'::json) AS checkins
    FROM place p
    LEFT JOIN checkin c ON p.id = c.place_id
    WHERE p.id = $1
    GROUP BY p.id`,
    [req.params.place_id]
  );
  res.status(200).json({ ...place.rows[0] });
})

placesRouter.put('/:place_id', async (req, res) => {
  const updatedPlace = await db.query(
    'UPDATE place SET name = $1 WHERE id = $2 RETURNING *',
    [req.body.name, req.params.place_id]
  );
  res.status(200).json({ ...updatedPlace.rows[0] });
})

placesRouter.delete('/:place_id', async (req, res) => {
  await db.query(
    'DELETE FROM place WHERE id = $1',
    [req.params.place_id]
  );
  res.status(204).end();
})

placesRouter.get('/', async (req, res) => {
  const places = await db.query(
    // 'SELECT * FROM place'
    `SELECT p.id, name, COALESCE(json_agg(c) FILTER (WHERE c.place_id IS NOT NULL), '[]'::json) AS checkins
    FROM place p
    LEFT JOIN checkin c ON p.id = c.place_id
    GROUP BY p.id`
  );
  res.status(200).json(places.rows);
});

placesRouter.post('/', async (req, res) => {
  const newPlace = await db.query(
    'INSERT INTO place(name) VALUES ($1) RETURNING *',
    [req.body.name]
  );
  res.status(201).json({ ...newPlace.rows[0] });
});

module.exports = placesRouter;