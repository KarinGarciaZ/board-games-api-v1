const express = require('express');
const Games = require('./games.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const games = await Games.getGames();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).send();
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const game = await Games.getGame(id);
    res.status(200).json(game);
  } catch (error) {
    res.status(500).send();
  }
});

router.post('/', (req, res) => {
    res.send();
});

router.put('/:id', (req, res) => {
    res.send();
});

router.delete('/:id', (req, res) => {
    res.send();
});

module.exports = { router };