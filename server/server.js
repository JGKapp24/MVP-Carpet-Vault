const path = require('path');
const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '../client/dist')));

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('Now listening on Port:', PORT));
