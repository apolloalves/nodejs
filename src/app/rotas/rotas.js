const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');
const { check, validationResult } = require('express-validator/check');


const LivroControlador = require( '../controladores/livro-controlador.js')
const livroControlador = new LivroControlador() 

module.exports = ( app ) => {
    app.get( '/', function( req, resp ) {
        resp.marko(
            require( '../views/base/home/home.marko' )
        );
    });
    
    app.get( '/livros', livroControlador.lista() ); 

    app.get('/livros/form', livroControlador.formularioCadastro() );

    app.get('/livros/form/:id', livroControlador.formularioEdicao() ) ;
    

    //express-validator 
    app.post('/livros', [ 
        check('titulo').isLength({ min: 5 }).withMessage('O titulo precisa ter no minimo 5 caracteres!'), 
        check('preco').isCurrency().withMessage( 'o preco precisar ter um valor monetario valido! ') ], ( req, resp ) => {
        
        console.log(req.body);

        const livroDao = new LivroDao(db);

         //const for validationResult
        const erros = validationResult(req)

        //conditional isEmpty()
        if(!erros.isEmpty()) {
            return resp.marko(
                require( '../views/livros/form/form.marko'),
                { 
                    livro: req.body, 
                    errosValidacao: erros.array()

                    
             }
           )
        }; 

        livroDao.adiciona(req.body)
                .then(resp.redirect('/livros'))
                .catch(erro => console.log(erro));
    });

    app.put('/livros', function(req, resp) {
        console.log(req.body);
        const livroDao = new LivroDao(db);
        
        livroDao.atualiza(req.body)
                .then(resp.redirect('/livros'))
                .catch(erro => console.log(erro));
    });

    app.delete('/livros/:id', function(req, resp) {
        const id = req.params.id;

        const livroDao = new LivroDao(db);
        livroDao.remove(id)
                .then(() => resp.status(200).end())
                .catch(erro => console.log(erro));
    });
    };