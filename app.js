const express = require('express');
require('express-async-errors');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
const placesRouter = require('./routes/places');
const checkinsRouter = require('./routes/checkins');
const personsRouter = require('./routes/persons');
const {
  unknownEndpoint,
  errorHandler,
  authToken,
} = require('./utils/middleware');
const authRouter = require('./routes/auth');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/places', placesRouter);
app.use('/api/checkins', authToken, checkinsRouter);
app.use('/api/persons', authToken, personsRouter);

app.get('/health', (req, res) => {
  res.json({ ping: 'pong' });
});

app.use(unknownEndpoint);

app.use(errorHandler);

module.exports = app;
