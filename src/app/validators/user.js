const User = require("../models/User");
const { compare } = require("bcryptjs");

function checkFillAllFields(body) {
  const keys = Object.keys(body);

  for (key of keys) {
    if (body[key] == "")
      return {
        user: body,
        error: "Por favor, preencha todos os campos",
      };
  }
}

async function show(req, res, next) {
  const { userId: id } = req.session;

  const user = await User.findOne({ where: { id } });

  if (!user)
    return res.render("user/register", {
      error: "Úsuario não encontrado",
    });

  req.user = user;

  next();
}

async function post(req, res, next) {
  // check if all fill fields
  const fillAllfields = checkFillAllFields(req.body);

  if (fillAllfields) return res.render("user/register", fillAllfields);

  // check if user exists
  let { email, cpf_cnpj, password, passwordRepeat } = req.body;

  const user = await User.findOne({
    where: { email },
    or: { cpf_cnpj },
  });

  if (user)
    return res.render("user/register", {
      user: req.body,
      error: "Usuário já existente",
    });

  // check if password & passwordRepeat
  if (password != passwordRepeat)
    return res.render("user/register", {
      user: req.body,
      error: "Senha diferente do campo repetir senha!",
    });

  next();
}
async function update(req, res, next) {
  const fillAllfields = checkFillAllFields(req.body);

  if (fillAllfields) return res.render("user/index", fillAllfields);

  const { id, password } = req.body;

  // vamos deixar ele atualizar apenas quando colocar a senha;
  if (!password)
    return res.render("user/register", {
      user: req.body,
      error: "Por favor, preencha a senha para atualizar",
    });

  const user = await User.findOne({ where: { id } });

  const passed = await compare(password, user.password);

  if (!passed)
    return res.render("user/index", {
      user: req.body,
      error: "Senha Incorreta",
    });

  req.user = user;

  next();
}
module.exports = {
  show,
  post,
  update,
};
