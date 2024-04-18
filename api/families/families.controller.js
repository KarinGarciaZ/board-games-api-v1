const express = require('express');
const FamiliesService = require('./families.service');

const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const families = await FamiliesService.getFamilies();
        res.status(200).json(families);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const family = await FamiliesService.getFamily(id);
        res.status(200).json(family);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/', (req, res) => {
    const body = req.body;
    body.id = null;
    try {
        FamiliesService.addFamily(body);
        res.status(201).send();
    }  catch (error) {
        res.status(500).json(error);
    }
});

router.put('/:id', (req, res) => {
    res.send('put families');
});

router.delete('/:id', (req, res) => {
    res.send('delete families');
});

module.exports = { router };