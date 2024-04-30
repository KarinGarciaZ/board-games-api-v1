const express = require('express');
const Games = require('./games.service');
const Versions = require('../versions/versions.utils');
const { getExtensionsByGameId } = require('../extensions/extensions.utils');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const games = await Games.getGames();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const game = await Games.getGame(id);
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id/extensions', async (req, res) => {
  try {
    const id = req.params.id;
    const extensions = await getExtensionsByGameId(id);
    res.status(200).json(extensions);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id/versions', async (req, res) => {
  try {
    const id = req.params.id;
    const versions = await Versions.getVersionsByGameId(id);
    res.status(200).json(versions);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
    const body = req.body;
    body.id = null;
    try {
      await Games.addGame(body);
      res.status(201).send();
    } catch (error) {
      res.status(500).json(error);
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {id: bodyId, ...body} = req.body;
    try {
      await Games.updateGame(id, body)
      res.status(201).send();
    } catch (error) {
      res.status(500).json(error);
    }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await Games.deleteGame(id)
    res.status(200).send();
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = { router };