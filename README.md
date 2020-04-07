<h1 align="center">
    <img alt="Launchbase" src="https://storage.googleapis.com/golden-wind/bootcamp-launchbase/logo.png" width="400px" />
</h1>


<i>// Módulo UploadImagens Imagens</i>


## BÔNUS
<h2>Menu Toggle</h2>

` HTML

<div class="menu-toggle">
  <div class="one"></div>
  <div class="two"></div>
  <div class="three"></div>
</div>

`

` CSS

/* MENU RESPONSIVO */
  header {
    padding: 10px 0px;
  }
  .main_logo img{
    height:30px;
  }
  nav.main_menu {
    visibility: hidden;
  }
  .one, .two,
  .three {
    width: 100%;
    height: 5px;
    margin: 6px auto;

    top: 0;
  
    background-color: #ffffff;
    transition-duration: 0.3s;

  }
  .menu-toggle {
    position: absolute;
    top: 25px;
    right: 20px;
    
    width: 40px;
    height: 30px;
    
    margin-right: 20px;
    cursor: pointer;
  }

  .menu-section.on {
    position: absolute;

    top: 0;
    left: 0;
    
    width: 100vw;
    height: 100vh;
    
    z-index: 100;
    
    background-color: var(--color-purple);
  }

  .menu-section.on .main_menu ul {
    font-size: 20px;

    visibility: visible;
    color: var(--color-gray);

    display: block;
    text-align: center;
  
    margin: 10px auto;
  }

  .menu-section.on .menu-toggle {
    position: absolute;
    top: 25px;
    right: 20px;
  } 

  .menu-section.on .menu-toggle .one{
    transform: rotate(45deg) translate(11px, 7px);
  }
  .menu-section.on .menu-toggle .two {
    opacity: 0;
  }
  .menu-section.on .menu-toggle .three {
    transform: rotate(-45deg) translate(9px, -4px);
  }

  .menu-section.on nav ul {
    text-align: center;
    display: block;
  }

  .menu-section.on nav ul a {
    display: block;
    transition-duration: 0.5s;
    font-size: 2rem;/* aumentando a letra */
    line-height: 4rem;

    color: var(--color-wrapper-bg);
  }

`


` // JAVASCRIPT

let show = true; 

const menuSection = document.querySelector(".menu-section");
const menuToggle = menuSection.querySelector(".menu-toggle");

menuToggle.addEventListener("click", () => {
  document.body.style.overflow = show ? "hidden" : "initial"; // se for true ele libera hidden , se não initial

  menuSection.classList.toggle("on", show); // na primeira vez que clicar ele(show) vai estar como true , então ele só vai reforça o comando de colocar a class on

  show = !show; //e ele vai receber false, na proxima vez o toggle vai saber que tem de tirar a class on,isso tudo ,para evitar de fazer a funcionar sem eu mandar
});
`
<i>a ideia do show , é para ele não estragar quando clicar demais em cima dele</i>

## Convertendo moeda.
`
const mask = {
  apply(input, func) {
    setTimeout(() => {
      input.value = mask[func](input.value);
    }, 1);
  },
  formatBRL(value) {
    value = value.replace(/\D/g, ""); // removendo todos os caracteres

    return Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value / 100); 
  }
};
`

<i>// aqui dividimos por 100 , para quando enviar 1,00 pela segunda vez não fique assim ou algo parecido</i>
`
  1º = 1,00
  2º = 1001,00
`
<p>obs: setTimeout(()=> , 1)</p>
<p>
  Ele é responsável por executar uma função depois de um determinado tempo
</p>

`
const mask = {
  apply(input, func) {
    setTimeout(() => {
      input.value = mask[func](input.value);
    }, 1);
  },
  formatBRL(value) {
    value = value.replace(/\D/g, "");

    return Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value / 100);
  }
};
`


## Lógica de envio de Imagem

`
const PhotosUpload = {
  input: "",
  preview: document.querySelector(".photos-upload__preview"),
  UploadLimit: 8,
  files: [],
  handleFileInput(event) {
    const { files: fileList } = event.target;
    PhotosUpload.input = event.target;

    if (PhotosUpload.hasLimit(event)) return;

    Array.from(fileList).forEach((file) => {
      const reader = new FileReader();
      PhotosUpload.files.push(file);

      reader.onload = () => {
        const image = new Image(); //<img>
        image.src = String(reader.result);

        const div = PhotosUpload.getContainer(image);

        PhotosUpload.preview.appendChild(div);
      };

      reader.readAsDataURL(file); // ele dispara o onload;
    });
    PhotosUpload.input.files = PhotosUpload.getAllFiles();
  },
  getAllFiles() { // ele atualiza a quantidade de arquivos(files) ainda existente;
    const dataTransfer =
      new ClipboardEvent("").clipboardData || new DataTransfer(); // mozilla e chrome;
    PhotosUpload.files.forEach((file) => dataTransfer.items.add(file));

    return dataTransfer.files;
  },
  hasLimit(event) { // da um limite de envio
    const { UploadLimit, input, preview } = PhotosUpload;
    const { files: fileList } = input;

    if (fileList.length > UploadLimit) {
      alert(
        `Você Ultrapassou o limite de envio de imagem(Limite máximo: ${UploadLimit})`
      );
      event.preventDefault();

      return true;
    }

    const photoDiv = [];
    preview.childNodes.forEach((item) => {
      if (item.classList && item.classList == "photo") photoDiv.push(item);
    });

    const totalPhotos = fileList.length + photoDiv.length;

    if (totalPhotos > UploadLimit) {
      alert(`Envie no máximo ${UploadLimit} fotos`);
      event.preventDefault();

      return true;
    }

    return false;
  },
  getContainer(image) { // cria uma div , que vai ser colocada dentro do PAI preview
    const div = document.createElement("div");
    div.classList.add("photo");

    div.onclick = PhotosUpload.removePhoto;

    div.appendChild(image);
    div.appendChild(PhotosUpload.removeButton());

    return div;
  },
  removeButton() { // tag i do material-icons
    const button = document.createElement("i");
    button.classList.add("material-icons");
    button.innerHTML = "close";

    return button;
  },
  removePhoto(event) { 
    // remove a photo do front(sumir a imagem da tela), e removendo do req.files para ele não enviar  photos que eu não queira


    const photoDiv = event.target.parentNode; // <div class="photo">
    const photoArray = Array.from(PhotosUpload.preview.children);

    const index = photoArray.indexOf(photoDiv);

    PhotosUpload.files.splice(index, 1);
    PhotosUpload.input.files = PhotosUpload.getAllFiles();

    return photoDiv.remove();
  },
  removeOldPhoto(event) { // Lógica para enviar o id da imagem para o input , que vai enviar para o banco deletar, usaremos a técnica de enviar com virgulas e separa com splice(); 

    const photoDiv = event.target.parentNode;
    console.log(photoDiv.id)

    if (photoDiv.id) {
      const removedFiles = document.querySelector(
        'input[name="removed_files"]'
      );

      if (removedFiles) {
        removedFiles.value += `${photoDiv.id},`; // vamos remover a virgula no controllers;
      }
    }

    return photoDiv.remove();
  },
};
`


## ASYNC/AWAIT
<p>no começo na da função, se eu quiser usar a função await , tenho que colocar o async no começo assim:</p>

`
  async show(req, res){
    let results = await Product.find(req.body);
    const product = results.rows[0];

    return res.render('/product',{ product });
  }
`

<p>o await espera! ou seja, ele "não vai" deixar o programa terminar sem ele ter feito seu requirimento no banco de dados</p>

# Multer.
<p>Multer é um middleware(ele intercepta antes de chegar no final da requisição)</p>
<i>npm install multer</i>

# Como configurar o multer ?

`
const multer = require('multer');

const storage = multer.DiskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images')
  },
  filename: (req, file, cb) =>{
    cb(null, `${Date.now().toString}-${file.originalname}`)
  }
});

const fileFilter = (req, file, cb) =>{
  const isAccept = ['image/png', 'image/jpg', 'image/jpeg']
  .find(isAcceptedFormat => isAcceptedFormat == file.mimetype);

}

module.exports = multer({
  storage,
  fileFilter
})
`
  <i>*mimetype = fala o tipo do arquivo(jpg, png etc);</i>

## PARA TUDO ISSO FUNCIONAR ADICIONE ISSO AO FORMS
` 
<form action="/admin?_method=PUT" method="POST" ectype="multipart/form-data">
`
<p>
  o ectype, vai aceitar o envio das imagens 
</p>


## Adicionando o multer na routes
`
const multer = require(../busque-a-pasta/que-configuramos);
const routes = express.Router();

routes.post('/', multer.array('photos', 6), CONTROLLERS);
routes.put('/', multer.array('photos', 6), CONTROLLERS);
`

<p>
multer.array(tag que está enviando as fotos, 6) *o segundo diz,quantas imagens você vai estar enviando;
</p>


# COMO SALVAR VARIAS IMAGES
<p>Usaremos o map para isso</p>
<i>*o map retorna uma promise;</i>
`
  async create(req, res){
    let results = await req.files.map(file => File.create(req.body));
    let files = await Promise.all(results);

    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
    }))
    await Promise.all(files);
  }
`

# Bônus
como usar results de uma Promise.all() ? 

`
  let results = req.files.map(file => File.create(file));
  let files = await Promise.all(results); // recebeu todos os results

  files = files.map(file => Recipes.create({
    ...file,
    fileId: file.rows[0].id
  })) 

  // aqui vou conseguir usar tranquilamente o results da promise;
  // Lembrando que temos que usar os rows, para ele usar id de todos(pq o map executa para cada um dos items do array) 
`


# Try/Catch.
ele vai ser reponsavel por tentar executar alguma coisa,

## Exemplo:
<a>
`
  try{
    'Vai tentar fazer algo'

  } catch(err){
    console.log(err); // caso algo de errado o catch vai ser responsável por enviar o erro;
  }

`
</a>


# Como remover as Imagens com apenas um click.(na edição é claro);
<p>bom, vamos passar os ID para o input[name="removed_files"] assim</p>

# [1, 2, 3,]
<p> repare que separamos por virgula , fizemos isso tudo no script.js.</p>

<p>e ainda no back-end Fizemos uma lógica com o split , para ele começar a separar os ID's quando ver uma virgula ficando assim: [[1] [2] [3,]]<p>

<p>então repare que ainda sobrou um virgula no três
filtraremos o array até o seu ultimo item (length - 1)</p>

<p>e removeremos com o splice('Aqui o que queremos remover', 1) obs: outro parametro é a quantidade</p>

<p>e logo após executaremos o banco de dados que vai ser responsável por deletar a imagem</p>

<p>usaremos o map(map executa para todos items de dentro do array uma função);</p>


# Como posicionar o footer sempre no rodapé?
 `
 body, html {
   min-height: 100vh;
 }

 body {
   display: flex;
   flex-direction: column;
 }

 footer {
   margin-top: auto;
 }

 `
 <p>Assim ele já vai se posicionar no final da página</p>


# Técnica loop
<p>
  Usamos ele para percorrer todos os items(começando do zero), e ver se tinha a class="active" que é responsável por mudar a opacity da imagem
 </p>

<p>Ele vai fazer um loop, ou melhor ele pode fazer uma leitura , ele começa começa da posição 1.
para começar da posição zero(como o array), temos que fazer assim:</p>
`
--
loop.index0
--
`

# ImageGallery.
aqui vai ser responsável por passar um class "active-image"(que diminui a opacity da imagem).
e tbm remove essa class.

1º primeiro: pega tudo que ele quer editar
2º Segundo: remove de todos a class="active-image"
3º Terceiro: adicione a class="active-image" no que clicamos
4º Quarto: altere a imagem dos highlight


`
const ImageGallery = {
  const ImageGallery = {
  highlight: document.querySelector(".gallery .highlight > img"),
  preview: document.querySelectorAll(".gallery-preview img"),
  setImage(event) {
    const { target } = event;

    ImageGallery.preview.forEach((file) =>
      file.classList.remove("active-image")
    ); //passando dentro do preview e vendo quem tem o active-Image e removendo antes de eu adicionar o proximo;

    target.classList.add("active-image");

    ImageGallery.highlight.src = target.src;
    LightBox.image.src = target.src;
  },
};
}
`

## LightBox
<p>
  aqui a ideia é mais simples, vamos alterar direto no javascript seus estilos;
</p>

`
const LightBox = {
  // Dados de entrada, processamento , e Saída;
  target: document.querySelector(".highlight .lightbox"),
  image: document.querySelector('.lightbox-target img'),
  closeButton: document.querySelector(".lightbox-target .close-lightbox"),
  open() {
    LightBox.target.style.opacity = 1;
    LightBox.target.style.top = 0;
    LightBox.target.style.bottom = 0;
    LightBox.closeButton.style.top = 0;
  },
  close() {
    LightBox.target.style.opacity = 0;
    LightBox.target.style.top = "-100%";
    LightBox.target.style.bottom = "initial";
    LightBox.closeButton.style.top = "-80px";
  },
};
`