const router = require('express').Router();
const home = require('../controllers/homeControllers');

const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);
router.get('/me', home.index)

module.exports = router;