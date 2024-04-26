const express = require('express');
const Versions = require('./versions.service');
const { upload } = require('../../middlewares/multer');

const router = express.Router();

router.post('/', upload.array('file'), async (req, res) => {
  try {
    const body = {...req.body, id: null};
    await Versions.createVersion(body);
    res.status(201).send('OK');
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const {id, ...body} = req.body;
    const versionId = req.params.id;
    await Versions.updateVersion(versionId, body);
    res.status(201).send('OK');
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const versionId = req.params.id;
    await Versions.deleteVersion(versionId);
    res.status(200).send('OK');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = { router };
