const Router = require('express');
const router = new Router();
const studentController = require('../controllers/studentController');

router.post('/registration', studentController.registration);
router.post('/login', studentController.login);
router.post('/updatePassword', studentController.updatePassword);
router.post('/getOne', studentController.getOneStudent);
router.get('/getAllStudent', studentController.getAllStudent);
router.post('/deleteStudent', studentController.deleteStudent);


module.exports = router;

