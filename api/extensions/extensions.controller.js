const express = require('express');
const { upload } = require('../../middlewares/multer');
const ExtensionsService = require('./extensions.service');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const extension = await ExtensionsService.getExtension(id);
    res.status(200).json(extension);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', upload.array('file'), async (req, res) => {;
  const body = JSON.parse(req.body.data);
  const files = req.files;
  body.id = null;
  try {
    await ExtensionsService.addExtension(body, files);
    res.status(201).send();
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', upload.array('file'), async (req, res) => {
  const id = req.params.id;
  const body = JSON.parse(req.body.data);
  const {id: bodyId, imagesToDelete, mainImageId, ...extension} = body
  try {
    await ExtensionsService.updateExtension(id,
      extension,
      imagesToDelete,
      mainImageId,
      req.files);
    res.status(201).send();
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    ExtensionsService.deleteExtension(id);
    res.status(200).send();
  } catch (error) {
    res.status(200).json(error);
  }
});

module.exports = {
  router
}