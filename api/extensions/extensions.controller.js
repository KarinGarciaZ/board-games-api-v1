const express = require('express');
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

router.post('/', async (req, res) => {
  const body = req.body;
  body.id = null;
  try {
    await ExtensionsService.addExtension(body)
    res.status(201).send();
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const {id: bodyId, ...body} = req.body
  try {
    await ExtensionsService.updateExtension(id, body);
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