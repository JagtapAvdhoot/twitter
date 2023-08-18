const { Router } = require("express");

const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const tweetRouter = require('./tweet.route');

const router = Router()


router.use('/authentication', authRouter);
router.use('/tweet', tweetRouter);
router.use('/user', userRouter);
// router.use('/setting');
// router.use('/notifications');
// router.use('/');

module.exports = router;