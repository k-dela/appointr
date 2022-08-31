const router = require('express').Router();
const auth = require('../controllers/authControllers');

router.get('/signup', auth.createUser);