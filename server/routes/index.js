const Router = require('express');
const router = new Router();
const studentRouter = require('./studentRouter');
const tutorRouter = require('./tutorRouter');
const deadlineRouter = require('./deadlineRouter');
const ticketRouter = require('./ticketRouter');


router.use('/student', studentRouter);
router.use('/tutor', tutorRouter);
router.use('/deadline', deadlineRouter);
router.use('/ticket', ticketRouter);


module.exports = router;