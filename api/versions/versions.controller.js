const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
  res.send('OK');
});

router.post('/', async (req, res) => {
  res.send('OK');
});

router.put('/:id', async (req, res) => {
  res.send('OK');
});

router.delete('/:id', async (req, res) => {
  res.send('OK');
});

module.exports = { router };
