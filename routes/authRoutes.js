const router = require('express').Router();
const auth = require('../controllers/authControllers');

router.get('/signup', auth.indexSignup);
router.post('/signup', auth.createUser);
router.get('/login', auth.indexLogin);
router.post('/login', auth.loginUser);
module.exports = router;