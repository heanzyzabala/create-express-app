/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const routes = require('./routes');

const { PORT, NODE_ENV } = process.env;

const { DB_HOST, DB_PORT, DB_NAME } = process.env;
mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

const app = express();
app.use(cors());
app.use(morgan('common', { skip: (req, res) => NODE_ENV === 'test' }));
app.use(express.json());
app.use(routes);
module.exports = app.listen(PORT, () => console.log(`Listening to port: ${PORT}, env: ${NODE_ENV}`));
