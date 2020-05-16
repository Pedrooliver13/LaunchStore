const User = require('../models/User');

async function post(req, res, next) {
  const keys = Object.keys(req.body);

  for (let key of keys) {
    if (req.body[key] == '') return res.render('user/register' , {
      user: req.body,
      error: "Por favor preencha todos os campos"
    });
  }

  let { email, cpf_cnpj, password, passwordRepeat } = req.body;

  const user = await User.findOne({
    where: { email },
    or: { cpf_cnpj }
  });


  if (user) return res.render('user/register' , {
    user: req.body,
    error: "Úsuario já existente"
  });


  if (password != passwordRepeat) return res.render('user/register' , {
    user: req.body,
    error: "Senha diferente do campo REPETIR SENHA" 
  });

  next();

};

module.exports = {
  post
};