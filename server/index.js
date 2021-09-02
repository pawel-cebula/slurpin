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
}

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.error('err: ', err);

  next(err);
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});