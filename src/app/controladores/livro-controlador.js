const { validationResult }  = require('express-validator/check')

const LivroDao = require('../infra/livro-dao')
const db = require('../../config/database')

const templates = require('../views/templates')


class LivroControlador {

	static rotas() {
		return {
			lista: '/livros', 
			cadastro: '/livros/form', 
			edicao: '/livros/form/:id', 
			delecao: '/livros/:id'

		};

	}

  lista () {
    return ( req, resp ) => {
      const livroDao = new LivroDao( db )
      
       livroDao.lista()
        .then(livros => resp.marko(
          templates.livros.lista,

          {
            livros: livros
          }

        ))
        .catch( erro => console.log( erro ) )
    	
    	}
  };

  formularioCadastro() {
  	return function(req, resp) {
        resp.marko( templates.livros.form, { livro: {}});

  	}; 
  }

  formularioEdicao() {
  	return ( req, resp ) => {
        const id = req.params.id;
        const livroDao = new LivroDao( db );

        livroDao.buscaPorId(id)
                .then(livro => 
                    resp.marko(
                    	templates.livros.form, 
                        { livro: livro }
                    )
                )
                .catch(erro => console.log( erro ));
  		}

	}

cadastra() {
	return ( req, resp ) => {
        
        console.log( req.body );

        const livroDao = new LivroDao( db );

         //const for validationResult
        const erros = validationResult( req )

        //conditional isEmpty()
        if ( !erros.isEmpty() ) {
            return resp.marko(
            	templates.livros.form,
                
                { 
                    livro: req.body, 
                    errosValidacao: erros.array()

                    
             }
           )
        }; 

        livroDao.adiciona( req.body )
                .then( resp.redirect(LivroControlador.rotas().lista ))
                .catch(erro => console.log( erro ));
    }

}

edita() {
	return ( req, resp ) => {
        console.log( req.body );
        const livroDao = new LivroDao( db );
        
        livroDao.atualiza(req.body)
                .then( resp.redirect(LivroControlador.rotas().lista ))
                .catch( erro => console.log( erro ) );
    };

};

remove() {
	return ( req, resp ) => {
        const id = req.params.id;

        const livroDao = new LivroDao( db );
        livroDao.remove(id)
                .then(() => resp.status( 200 ).end())
                .catch( erro => console.log( erro ));
    }
}


}
//end class 
module.exports = LivroControlador






