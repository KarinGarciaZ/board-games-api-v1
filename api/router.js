const express = require('express');
const router = express.Router();

const { router: familiesRouter } = require('./families/families.controller');
const { router: brandsRouter } = require('./brands/brands.controller');
const { router: gamesRouter } = require('./games/games.controller');
const { router: extensions } = require('./extensions/extensions.controller');
const { router: versionsRouter } = require('./versions/versions.controller');

router.use('/families', familiesRouter);
router.use('/brands', brandsRouter);
router.use('/games', gamesRouter);
router.use('/extensions', extensions);
router.use('/versions', versionsRouter);

module.exports = { router };