const User = require("../models/User");
const { compare } = require("bcryptjs");

async function login(req, res, next) {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user)
    return res.render("session/login", {
      user: req.body,
      error: "Usuário não existe",
    });

  const passed = await compare(password, user.password);

  if (!passed)
    return res.render("session/login", {
      user: req.body,
      error: "Senha incorreta",
    });

  req.user = user; // estamos enviando para proxima parte(controllers) o dados do user;

  next();
}

async function forgot(req, res, next) {
  try {
    // como ele é unico é muito bom para conseguir procurar o usuario;
    const { email } = req.body; 

    // procura dinâmicamente no banco de dados;
    const user = await User.findOne({ where: { email } }); 

    if (!user)
      return res.render("session/forgot-password", {
        user: req.body,
        error: "Email não cadastrado!",
      });

    next();

  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  login,
  forgot
};

// * verificamos se está cadastrado;
// * verificar se o password bate;
// * depois enviar para o session;
