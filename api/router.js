const express = require('express');
const router = express.Router();

const { router: familiesRouter } = require('./families/families.controller');
const { router: brandsRouter } = require('./brands/brands.controller');
const { router: gamesRouter } = require('./games/games.controller');
const { router: versionsRouter } = require('./versions/versions.controller');

router.use('/families', familiesRouter);
router.use('/brands', brandsRouter);
router.use('/games', gamesRouter);
router.use('/versions', versionsRouter);

module.exports = { router };