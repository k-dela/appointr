const router = require('express').Router();
const event = require('../controllers/eventController');

router.get('/new', event.new);
router.post('/', event.create)

module.exports = router;