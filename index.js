const express = require('express');
const bodyParser = require('body-parser');
const { router: familiesRouter } = require('./api/families/families.controller');
const { router: brandsRouter } = require('./api/families/brands/brands.controller');

const app = express();
app.use(bodyParser.json());

app.use('/families', familiesRouter);
app.use('/brands', brandsRouter);

const port = 3000;
const host = '127.0.0.1';

app.listen(port, host, () => {
  console.log('¡Escuchando en puerto 3000!');
});
