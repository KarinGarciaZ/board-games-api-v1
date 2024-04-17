const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  return res.send();
});

router.get('/:id', (req, res) => {
  return res.send();
});

router.post('/', (req, res) => {
  return res.send();
});

router.put('/:id', (req, res) => {
  return res.send();
});

router.delete('/:id', (req, res) => {
  return res.send();
});

module.exports = { router };