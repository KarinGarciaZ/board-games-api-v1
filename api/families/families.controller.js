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

router.get('/:id', (req, res) => {
    res.send('get families');
});

router.post('/', (req, res) => {
    res.send('post families');
});

router.put('/:id', (req, res) => {
    res.send('put families');
});

router.delete('/:id', (req, res) => {
    res.send('delete families');
});

module.exports = { router };