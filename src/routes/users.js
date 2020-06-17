const express = require('express');
const routes = express.Router();

// const sessionControllers = require('../app/controllers/sessionControllers');
const userControllers = require('../app/controllers/userControllers');
const sessionControllers = require('../app/controllers/sessionControllers');
const sessionValidator = require('../app/validators/session'); // ? middleware para passar as validações;
const userValidator = require('../app/validators/user'); // ? middleware para passar as validações;

const { isLoggedRedirectToUsers } = require('../app/middlewares/session');

// sessionControllers Responsável por: --> login, logout -- forgot password etc;

// login/logout
routes.get('/login', isLoggedRedirectToUsers, sessionControllers.loginForm);
routes.post('/login', sessionValidator.login, sessionControllers.login);
routes.post('/logout', sessionControllers.logout); // como fazer o logout? --> 

// resetPassword/forgot; 
routes.get('/forgot-password', sessionValidator.forgot, sessionControllers.forgotForm);
routes.get('/password-reset', sessionControllers.resetForm);
routes.post('/forgot-password', sessionValidator.forgot, sessionControllers.forgot);
routes.post('/password-reset',  sessionValidator.reset, sessionControllers.reset);

// userControllers; responsável por: --> criação, atualização, remoção; 


routes.get('/register', userControllers.registerForm);
routes.post('/register', userValidator.create,  userControllers.create);

routes.get('/', userValidator.show, userControllers.show);
routes.put('/', userValidator.update, userControllers.update);
// routes.delete('/', userControllers.delete);

module.exports = routes; 