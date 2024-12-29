const Router = require('express');
const router = new Router();
const ticketController = require('../controllers/ticketController');

router.post('/create', ticketController.create);
router.post('/getAll', ticketController.getAll);
router.post('/delete', ticketController.delete);
router.post('/updateStatus', ticketController.updateStatus);
router.post('/updateTutor', ticketController.updateTutor);

module.exports = router;

