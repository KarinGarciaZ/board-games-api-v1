const express = require('express');
const Games = require('./games.service');
const Versions = require('../versions/versions.utils');
const { getExtensionsByGameId } = require('../extensions/extensions.utils');
const { upload } = require('../../middlewares/multer');

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

router.post('/', upload.array('file'), async (req, res) => {
  const body = JSON.parse(req.body.data);
  const files = req.files;
  console.log(files);
    try {
      await Games.addGame(body, files);
      res.status(201).send();
    } catch (error) {
      res.status(500).json(error);
    }
});

router.put('/:id', upload.array('file'), async (req, res) => {
    const id = req.params.id;
    const body = JSON.parse(req.body.data);
  const {id: bodyId, imagesToDelete, mainImageId, ...game} = body
    try {
      await Games.updateGame(id,
        game,
        imagesToDelete,
        mainImageId,
        req.files
      )
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