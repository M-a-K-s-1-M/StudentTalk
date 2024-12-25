const Router = require('express');
const router = new Router();
const studentRouter = require('./studentRouter');
const tutorRouter = require('./tutorRouter');
const deadlineRouter = require('./deadlineRouter');
const ticketRouter = require('./ticketRouter');
const cursRouter = require('./cursRouter');
const groupRouter = require('./groupRouter');
const messageRouter = require('./messageRouter')


router.use('/student', studentRouter);
router.use('/tutor', tutorRouter);
router.use('/deadline', deadlineRouter);
router.use('/ticket', ticketRouter);
router.use('/curs', cursRouter);
router.use('/group', groupRouter);
router.use('/message', messageRouter);


module.exports = router;