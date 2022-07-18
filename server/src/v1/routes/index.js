const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/boards', require('./board'));
router.use('/boards/:boardId/sections', require('./section'));

module.exports = router;
