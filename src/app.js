require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes');

const { PORT, NODE_ENV } = process.env;

const app = express();
app.use(cors());
app.use(morgan('common', { skip: (req, res) => NODE_ENV === 'test' }));
app.use(express.json());
app.use(routes);
module.exports = app.listen(PORT, () => console.log(`Listening to port: ${PORT}, env: ${NODE_ENV}`));