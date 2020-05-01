
class UserControllers {
  registerForm(req, res){
    return res.render('user/register');
  };
}

module.exports = new UserControllers;


// class userControllers {
//   constructor(name, address){
//     this.name = name;
//     this.address = address;
//   }
//   getNameAddress(){
//     return this.name + " " + this.address;
//   }
// }

// // a ideia de usar o class é que os dados vão ser passados corretamente;
// // this --> como funciona? --> "recebe"/siginificado o valor;

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