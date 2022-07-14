const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/boards', require('./board'));

module.exports = router;
