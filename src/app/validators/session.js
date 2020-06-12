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
  // como ele(email) é unico é muito bom para conseguir procurar o usuario;
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.render("session/forgot-password", {
        user: req.body,
        error: "Email não cadastrado!",
      });

    req.user = user;

    next();
  } catch (err) {
    console.error(err);
  }
}

async function reset(req, res, next) {
  const { email, password, passwordRepeat, token } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.render("session/password-reset", {
        user: req.body,
        token,
        error: "Usuário não encontrado",
      });

    // se senha bate;
    if (password != passwordRepeat)
      return res.render("session/password-reset", {
        user: req.body,
        token,
        error: "Senha incorreta",
      });

    // token bate
    if (token != user.reset_token) return res.render('session/password-reset', {
      token,
      error: "Token inválido",
    });

   // vamos pegar o horario atual, para sabermos se ja expirou o token;
    let now = new Date();
    now = now.getHours(); 

    if (now > user.reset_token_expires)
      return res.render('session/password-reset', {
        token,
        error: "Token expirado, por favor faça um novo pedido de token.",
      });

    req.user = user;
      
    next();
          
  } catch (err) {
    console.error(err);
    return  res.render('session/password-reset', {
      token,
      error: "Algum erro aconteceu",
    });
  }
}

module.exports = {
  login,
  forgot,
  reset
};

// * verificamos se está cadastrado;
// * verificar se o password bate;
// * depois enviar para o session;
