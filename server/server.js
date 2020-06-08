const path = require('path');
const express = require('express');
const morgan = require('morgan');
const config = require('../config.js');

const app = express();

const PORT = config.app.port;

const router = require('./routers/index.js');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/dist')));

// Router
app.use('/data', router);

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('Now listening on Port:', PORT));
