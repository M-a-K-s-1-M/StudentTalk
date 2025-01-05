const Router = require('express');
const router = new Router();
const tutorController = require('../controllers/tutorController.js');
const adminController = require('../controllers/adminController.js');

router.post('/registrationTutor', tutorController.registration);
router.post('/login', adminController.login);

module.exports = router;
