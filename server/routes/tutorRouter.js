const Router = require('express');
const router = new Router();
const tutorController = require('../controllers/tutorController');

router.post('/registration', tutorController.registration);
router.post('/login', tutorController.login);
router.post('/updatePassword', tutorController.updatePassword);
router.get('/getAllTutor', tutorController.getAllTutor);
router.post('/deleteTutor', tutorController.deleteTutor);
router.post('/updateTutor', tutorController.updateTutor);
router.post('/getOneTutor', tutorController.getOneTutor);


module.exports = router;

