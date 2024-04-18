const express = require('express');
const Brands = require('./brands.service.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const brands = await Brands.getBrands();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).send();
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const brand = await Brands.getBrand(id);
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).send();
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  body.id = null;
  try {
    await Brands.addBrand(body);
    res.status(201).send();
  } catch (error) {
    res.status(500).send();
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const {id: bodyId, ...body} = req.body
  try {
    await Brands.updateBrand(id, body);
    res.status(201).send();
  } catch(error) {
    res.status(500).send();
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Brands.deleteBrand(id);
    res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = { router };