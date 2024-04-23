const express = require('express');

const router = express.Router();

router.get('/:id', async (req, res) => {
  res.status(200).send();
});

router.post('/', async (req, res) => {
  res.status(201).send();
});

router.put('/:id', async (req, res) => {
  res.status(201).send();
});

router.delete('/:id', async (req, res) => {
  res.status(200).send();
});

module.exports = {
  router
}