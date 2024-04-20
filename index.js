const express = require('express');
const bodyParser = require('body-parser');
const { router } = require('./api/router');
const { verifyAuth }  = require('./middlewares/auth');
const env = require('dotenv');

env.config();
const app = express();
app.use(bodyParser.json());
app.use(verifyAuth);
app.use(router);

const port = process.env.APP_PORT;
const host = process.env.APP_HOST;

app.listen(port, host, () => {
  console.log('¡Escuchando en puerto 3000!');
});
