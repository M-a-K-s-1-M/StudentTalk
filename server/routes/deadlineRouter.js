const Router = require('express');
const router = new Router();
const deadlineController = require('../controllers/deadlineController');

router.post('/create', deadlineController.create);
router.get('/getAll', deadlineController.getAll);
router.get('/getFilter', deadlineController.getFilter);
router.post('/delete', deadlineController.delete);


module.exports = router;

