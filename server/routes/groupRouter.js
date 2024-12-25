const Router = require('express');
const router = new Router();
const groupController = require('../controllers/groupContorller');

router.post('/create', groupController.create);
router.get('/getAll', groupController.getAll);
router.get('/getOne', groupController.getOne);

module.exports = router;