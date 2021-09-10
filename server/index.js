require('dotenv').config();
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const placesRouter = require('./routes/places');
const checkinsRouter = require('./routes/checkins');
const personsRouter = require('./routes/persons');
const { unknownEndpoint, errorHandler } = require('./utils/middleware');

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

app.use(unknownEndpoint);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
