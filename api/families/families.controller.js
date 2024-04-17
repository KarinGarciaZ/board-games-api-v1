const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('get families');
});

router.get('/:id', (req, res) => {
    res.send('get families');
});

router.post('/', (req, res) => {
    res.send('post families');
});

router.put('/', (req, res) => {
    res.send('put families');
});

router.delete('/', (req, res) => {
    res.send('delete families');
});

module.exports = { router };