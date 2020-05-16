const session = require('express-session');
const pgSession = require('connect-pg-simple')(session); // ele recebe uma função;

const db = require('../config/db');

module.exports = session({ // ? configurando a session;
  store: new pgSession({
    pool: db 
  }),
  secret: "iabadabadu", 
  resave: false,
  saveUninitialized: false,
  cookie: {
    // * 30 dias tem 24 horas cada hora tem 60 minutos e 60 segundos e 100 milisegundos;
    maxAge: 30 * 24 * 60 * 60 * 1000 
  }
});

// ! --> passo o banco de dados. --> cria as seção e passa para o banco de dados;
// ! --> passamos uma chave secreta;

// *  store --> o que faz? --> cria a session --> como ? --> passando para o banco de dados;
// * secret --> o que faz? --> recebe uma chave secreta;
// * resave --> o que faz? --> faz o resalvamento --> o quero que faça? --> salve apenas uma vez; 
// * saveUninitialized --> o que faz? --> faz o salvamento no banco --> o quero que faça --> salve apenas quando feito o login;
// * cookie --> o que faz? --> faz certa limitações --> maxAge --> o que faz? --> determina o dias que vão estar liberados;