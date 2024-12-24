const Router = require('express');
const router = new Router();
const ticketController = require('../controllers/ticketController');

router.post('/create', ticketController.create);
router.get('/getAll', ticketController.getAll);
router.post('/delete', ticketController.delete);

module.exports = router;

