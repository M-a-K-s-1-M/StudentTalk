const Router = require('express');
const router = new Router();
const cursController = require('../controllers/cursContorller');

router.post('/create', cursController.create);
router.get('/getAll', cursController.getAll);
router.get('/getOne', cursController.getOne);

module.exports = router;