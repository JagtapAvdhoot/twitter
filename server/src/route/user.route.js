const { Router } = require('express');

const { follow, commented, follower, following, liked, me, profile, remove, report, search, update } = require('../controller/user.controller');
const requireSignIn = require('../middleware/requireSignIn');

const userRouter = Router()


userRouter.get('/follow', requireSignIn, follow);

module.exports = userRouter;