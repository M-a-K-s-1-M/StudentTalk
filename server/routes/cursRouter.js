const Router = require('express');
const router = new Router();
const cursController = require('../controllers/cursContorller');

router.post('/create', cursController.create);
router.post('/getAll', cursController.getAll);
router.post('/getOne', cursController.getOne);

module.exports = router;