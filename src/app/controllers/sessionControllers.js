const crypto = require('crypto');

module.exports = {
  loginForm(req, res) {
    return res.render("session/login");
  },
  login(req, res) {
    // após o validator , ele passa por aqui;
    req.session.userId = req.user.id;

    return res.redirect('/user');
  },
  logout(req, res) {
    req.session.destroy();
    
    return res.redirect("/");
  },
  forgotForm(req, res) {
    return res.render("session/forgot-password");
  },
  forgot(req, res) {
    // token para o usuario;
    const token = crypto.randomBytes(20).toString('hex');


    // criar uma expiração do token;

  }
};
