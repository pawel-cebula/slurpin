require('dotenv').config();
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const placesRouter = require('./routes/places');
const checkinsRouter = require('./routes/checkins');
const personsRouter = require('./routes/persons');

const PORT = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api/places', placesRouter);
app.use('/api/checkins', checkinsRouter);
app.use('/api/persons', personsRouter);

app.get('/', (req, res) => {
  res.send('home page');
});

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

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

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
