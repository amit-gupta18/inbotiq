const router = require('express').Router();
const { registerUser, loginUser, logoutUser , userDetails } = require('../controllers/auth.controllers');
const { authMiddleware } = require('../middleware/auth.middleware');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/me' , authMiddleware , userDetails);
router.post('/logout', logoutUser);

module.exports = router;