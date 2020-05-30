function onlyUsers(req, res, next) {
  if (!req.session.userId) return res.redirect('/user/login'); 
  // ? quando está logado ele tem um id; portanto se não tiver que dizer que não está logado; 

  next();
}

// AGORA QUANDO ESTIVER LOGADO QUERO QUE REDIRECT PARA USERS;

function isLoggedRedirectToUsers(req, res, next) {
  if(req.session.userId) return res.redirect('/user');

  next();
}

module.exports = {
  onlyUsers,
  isLoggedRedirectToUsers
}