
<blockquote> 
  -onblur --> eventListener --> quando sai do campo ele executa;

  - parentNode --> pega a classe pai;

  - vou limpar toda hora que entrar no input;
</blockquote>

---

# EXPRESSÃO REGULAR

---

```
// sinal de ^ significa "começar por..."
// \w+ --> significa que vai aceitar 1 ou mais caracteres;
// () -->  pode ser usada --> placeholder, e para agrupar código;
// [] --> para que serve? --> colocar caracteres que vão ser aceito;
// [\.-] --> barra na frente do ponto diz que é um ponto não um valor (o ponto é um valor na expressão regular);
// ([\.-]?) --> o ponto de interogação diz que é facultativo;
// ([\.-]?\w+) --> o "w+" aceita mais caracteres após os traços;
// ([\.-]?\w+)*/ --> "*" significa --> pode ter nenhum ou muitos;
// (\.\w{2,3})+$/ --> aceitar pontos , 2 ou 3 caracteres após o ponto;
// $ --> termina a expressão;
```
# QUERY DINÂMICA PARA BUSCAR USUARIOS;

<p align="center">userControllers.js</p>

```
async post (req, res){
  
  // check if has user exist;
  const { email, cpf_cnpj } = req.body;
  const user = await User.findOne({
    where: { email },
    or: {cpf_cnpj}
  });

};
```

<p align="center">User.js(connection with database)</p>

```
async findOne(filters){
  query = "SELECT * FROM users";

  Object.keys(filters).map(key => {

    query = `${query} ${key}`; // --> passando filtro

    Object.keys(filtes[key]).map(field) => {
      query = `${query} ${field} = '${filters[key][field]}' `

    }; // --> passando o campo;

  });

  // vai ficar assim : query = ` SELECT * FROM users WHERE  `


};

```
<i>* obs: Lembrando que o map, executa a função para cada item. </i>

---

<blockquote>Class Orientado objetos</blockquote>

```
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

```
