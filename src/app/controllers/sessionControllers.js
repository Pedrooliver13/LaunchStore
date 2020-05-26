const User = require("../models/User");

module.exports = {
  loginForm(req, res) {
    return res.render("session/login");
  },
  login(req, res) {
    // verificar se o usuário está cadastrado;

    // verificar se o password bate;

    // depois colocar o usuário session;
    req.session.userId = req.user.id;

    return res.redirect('/user');
  },
  logout(req, res) {
    req.session.destroy();
    return res.redirect("/");
  },
};
