const express = require('express');
const bodyParser = require('body-parser');
const { router: familiesRouter } = require('./api/families/families.controller');

const app = express();
app.use(bodyParser.json());

app.use('/families', familiesRouter);

const port = 3000;
const host = '127.0.0.1';

app.listen(port, host, () => {
  console.log('¡Escuchando en puerto 3000!');
});
