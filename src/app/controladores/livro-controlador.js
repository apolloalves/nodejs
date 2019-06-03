const LivroDao = require('../infra/livro-dao')
const db = require('../../config/database')

class LivroControlador {

  lista () {
    return ( req, resp ) => {
      const livroDao = new LivroDao( db )
      livroDao.lista()
        .then(livros => resp.marko(
          require('../views/livros/lista/lista.marko'),
          {
            livros: livros
          }
        ))
        .catch( erro => console.log( erro ) )
    	}
  };



}
//end class 
module.exports = LivroControlador
