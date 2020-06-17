const User = require("../models/User");
const { formatCpfCnpj, formatCep } = require("../../lib/utils");

module.exports = {
  registerForm(req, res) {
    return res.render("user/register");
  },
  async show(req, res) {
    try {
      const { user } = req;

      user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj);
      user.cep = formatCep(user.cep);

      return res.render("user/index", { user });
    } catch (error) {
      console.error(error);

      return res.render("user/index", {
        error: "Aconteceu algo de errado",
      });
    }
  },
  async create(req, res) {
    try {
      // ? importante para saber o que estou enviando;
      let { name, email, password, cpf_cnpj, cep, address } = req.body;

      const userId = await User.create({
        name,
        email,
        password,
        cpf_cnpj,
        cep,
        address,
      });

      req.session.userId = userId; // ? passo o userId para o session que manda para o banco de dados;

      return res.redirect("/user");
    } catch (error) {
      console.error(error);
    }
  },
  async update(req, res) {
    try {
      const { user } = req;
      let { name, email, cpf_cnpj, address, cep } = req.body;

      cpf_cnpj = cpf_cnpj.replace(/\D/g, "");
      cep = cep.replace(/\D/g, "");

      await User.update(user.id, {
        name,
        email,
        cpf_cnpj,
        cep,
        address,
      });

      return res.render("user/index", {
        user: req.body,
        success: "Conta atualizada com sucesso",
      });
    } catch (error) {
      console.error(error);

      return res.render("user/index", {
        error: "Algum erro aconteceu",
      });
    }
  },
  async delete(req, res) {
    try {
      await User.delete(req.body);
      req.session.destroy();

      return res.redirect("user/login", {
        success: "Conta deletada com sucesso",
      });
    } catch (err) {
      console.error(err);
      return res.render('user/index', {
        error: "Algum erro aconteceu!"
      })
    }
  },
};

// class UserControllers {
//   registerForm(req, res) {
//     return res.render("user/register");
//   }
//   async post(req, res) {
// * check if all fields
//     const keys = Object.keys(req.body);

//     for (let key of keys){
//       if(req.body[key] == "") return res.send('Please, fill all fields');
//     };

//     // * Check if user exists [email, cpf_cnpj] (esse tem der ser unicos);
//     let { email, cpf_cnpj, password, passwordRepeat } = req.body;

//     // ? para o cpf_cnpj conseguir ve se já existe , tem que fazer um replace para remover todos os dígitos;
//     cpf_cnpj = cpf_cnpj.replace(/\D/g, "");

//     // * check if user exists
//     const user = await User.findOne({
//       where: {email},
//       or: {cpf_cnpj}
//     });

//     if (user) return res.send("User exits");

//     // * check if password and passwordRepeat match;
//     if (password != passwordRepeat) return res.send('Password dont match');

//     return res.send('Passed');
//   };
// }

// module.exports = new UserControllers();

// class userControllers {
//   constructor(name, address){
//     this.name = name;
//     this.address = address;
//   }
//   getNameAddress(){
//     return this.name + " " + this.address;
//   }
// }

//  a ideia de usar o class é que os dados vão ser passados corretamente;
//  this --> como funciona? --> "recebe"/siginificado o valor;

// const user1 = new userControllers('Pedro', 'Rua X');
// console.log(user1.getNameAddress());

// const user2 = new userControllers('Julio', "Rua Y");
// console.log(user2.getNameAddress());

// heraça;

// class Person {
//   constructor(name){
//     this.name = name;
//   }
// }

// class Dev extends Person {
//   getName(){
//     return "outra coisa" // assim é possível alterar o name do person
//   }
// }

// const dev = new Dev("Pedro");
// console.log(dev.getName());
