const multer = require("multer");

const storage = multer.diskStorage({ // onde e com qual nome ele vai ser salvo;
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now().toString()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) =>{ // tipo da imagem
  const isAccept = ['image/png', 'image/jpg', 'image/jpeg']
  .find(AcceptedFormat => AcceptedFormat == file.mmimetype);
  
  //find precisa de true or false para continuar;
  if(isAccept) return cb(null, true);

  return cb(null, false);
};

module.exports = multer({
  storage,
  fileFilter
});
