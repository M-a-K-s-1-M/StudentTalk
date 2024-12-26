const Router = require('express');
const router = new Router();
const groupController = require('../controllers/groupContorller');

router.post('/create', groupController.create);
router.post('/getAll', groupController.getAll);
router.post('/getOne', groupController.getOne);

module.exports = router;