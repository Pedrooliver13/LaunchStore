const User = require("../models/User");

// ? validators --> é um middleware --> PQ? --> organização

async function post(req, res, next) {
  // * check if fill all fields;
  const keys = Object.keys(req.body);

  for (let key of keys) {
    if (req.body[key] == "")
      return res.render("user/register", {
        user: req.body,
        error: "Por favor preencha todos os campos",
      });
  }

  // * check if user exists
  let { email, cpf_cnpj, password, passwordRepeat } = req.body;

  cpf_cnpj = cpf_cnpj.replace(/\D/g, "");

  const user = await User.findOne({
    where: { email },
    or: { cpf_cnpj },
  });

  if (user)
    return res.render("user/register", {
      user: req.body,
      error: "Úsuario já existente",
    });

  // * check if password & passwordRepeat;
  if (password != passwordRepeat) return res.render('user/register' , {
    user: req.body,
    error: "Senha diferente da repetição da senha"
  });

  // todo: quando acabar a validação ele vai seguir em frente com o next();
  next();

}

module.exports = {
  post,
};
