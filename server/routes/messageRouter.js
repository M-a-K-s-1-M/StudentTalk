const Router = require('express');
const router = new Router();
const messageController = require('../controllers/messageController');

router.post('/create', messageController.create);
router.post('/getAll', messageController.getAll);


module.exports = router;