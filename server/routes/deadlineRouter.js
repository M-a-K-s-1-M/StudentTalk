const Router = require('express');
const router = new Router();
const deadlineController = require('../controllers/deadlineController');

router.post('/create', deadlineController.create);
router.post('/getAll', deadlineController.getAll);
router.post('/getFilter', deadlineController.getFilter);
router.post('/delete', deadlineController.delete);


module.exports = router;

