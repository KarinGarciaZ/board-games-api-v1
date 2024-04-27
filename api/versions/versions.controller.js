const express = require('express');
const Versions = require('./versions.service');
const { upload } = require('../../middlewares/multer');

const router = express.Router();

router.post('/', upload.array('file'), async (req, res) => {
  try {
    const body = JSON.parse(req.body.versionData);
    body.id = null;
    
    await Versions.createVersion(body, req.files);
    res.status(201).send('OK');
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', upload.array('file'), async (req, res) => {
  try {
    const versionData = JSON.parse(req.body.versionData);
    const {id, imagesToDelete, mainImage, ...body} = versionData;
    const versionId = req.params.id;
    await Versions.updateVersion(versionId, body, req.files, imagesToDelete, mainImage);
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
