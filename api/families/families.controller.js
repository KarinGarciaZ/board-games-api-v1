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

router.post('/', async (req, res) => {
    const body = req.body;
    body.id = null;
    try {
        await FamiliesService.addFamily(body);
        res.status(201).send();
    }  catch (error) {
        res.status(500).json(error);
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {id: idBody, ...body} = req.body;
    try {
        await FamiliesService.updateFamily(id, body);
        res.status(201).send();
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await FamiliesService.deleteFamily(id);
        res.status(200).send();
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = { router };