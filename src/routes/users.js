const express = require('express');
const routes = express.Router();

// const sessionControllers = require('../app/controllers/sessionControllers');
const userControllers = require('../app/controllers/userControllers');
const validator = require('../app/validators/user'); // ? middleware para passar as validações;

// sessionControllers Responsável por: --> login, logout -- forgot password etc;

// login/logout
// routes.get('/login', sessionControllers.loginForm);
// routes.post('/login', sessionControllers.login);
// routes.post('/logout', sessionControllers.logout);

// // resetPassword/forgot; 
// routes.get('/forgot-password', sessionControllers.forgotForm);
// routes.get('/password-reset', sessionControllers.resetForm);
// routes.post('/forgot-password', sessionControllers.forgot);
// routes.post('/password-reset', sessionControllers.reset);

// userControllers; responsável por: --> criação, atualização, remoção; 


routes.get('/register', userControllers.registerForm);
routes.post('/register', validator.post,  userControllers.post);

routes.get('/', validator.show,userControllers.show);
routes.put('/', validator.update, userControllers.put);
// routes.delete('/', userControllers.delete);

module.exports = routes; 