const { Router } = require('express');
const { login, logout, register } = require('../controller/auth.controller');

const authRouter = Router()


// GET /api/logout: User logout and invalidate the session.
authRouter.get('/logout', logout);


// POST /api/register: Register a new user.
authRouter.post('/register', register);
// POST /api/login: User login and authentication.
authRouter.post('/login', login);

module.exports = authRouter;