const User = require("../models/User");

const crypto = require("crypto");
const mailer = require('../../lib/mailer');

const { hash } = require('bcryptjs');

module.exports = {
  loginForm(req, res) {
    return res.render("session/login");
  },
  login(req, res) {
    // após o validator , ele passa por aqui;
    req.session.userId = req.user.id;

    return res.redirect("/user");
  },
  logout(req, res) {
    req.session.destroy();

    return res.redirect("/");
  },
  forgotForm(req, res) {
    return res.render('session/forgot-password');
  },
  async forgot(req, res) {
    const { user } = req;

    try {
      // token para o usuario;
      const token = crypto.randomBytes(20).toString("hex");

      // criar uma expiração do token;
      let now = new Date();
      now = now.setHours(now.getHours() + 1);

      await User.update(user.id, {
        reset_token: token,
        reset_token_expires: now,
      });

      await mailer.sendMail({
        to: user.email,
        from: "no-replay@launchbase.com",
        subject: "Recuperação de senha",
        html: `
        <h2>Esqueceu a senha?</h2>

        <div>
          <p>Não se preocupe , clique no link para recuperar sua senha</p>

          <a href="http://localhost:3000/user/password-reset?token=${token}"  target="_blank">Recuperar senha</a>
        </div>
      `,
      });

      return res.render("session/password-reset", {
        token,
        success: "E-mail enviado com sucesso, Verifique seu email.",
      });
    } catch (err) {
      console.error(err);
    }
  },
  resetForm(req, res) {
    return res.render('session/password-reset', { token: req.query.token });
  },
  async reset(req ,res ) {
    const { user } = req;
    const { password } = req.body;

    try {
      const newPassword = await hash(password, 8);

      // vamos atualizar o password e zerar o token;
      await User.update(user.id, {
        password: newPassword,
        reset_token: "",
        reset_token_expires: ""
      })

      return res.render('session/login', {
        user: req.body,
        success: "Senha atualizada! Faça seu login"
      });
      
    } catch (err) {
      console.error(err);
      return res.render('session/password-reset', {
        user: req.body,
        token,
        error: "Algum erro aconteceu"
      });
    }

  }
};
