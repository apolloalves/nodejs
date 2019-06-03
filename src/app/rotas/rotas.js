const { check } = require('express-validator/check');

const BaseControlador = require('../controladores/bae-controlador.js');
const baseControlador = new BaseControlador(); 

const LivroControlador = require( '../controladores/livro-controlador');
const livroControlador = new LivroControlador() 

module.exports = ( app ) => {

    app.get( '/', baseControlador.home() );

    app.get( '/livros', livroControlador.lista() ); 

    app.get('/livros/form', livroControlador.formularioCadastro() );

    app.get('/livros/form/:id', livroControlador.formularioEdicao() ) ;
    

    //express-validator 
    app.post('/livros', [ 
        
        check( 'titulo' ).isLength({ min: 5 }).withMessage('O titulo precisa ter no minimo 5 caracteres!'), 
        check( 'preco' ).isCurrency().withMessage( 'o preco precisar ter um valor monetario valido! ')

         ], 

            livroControlador.cadastra()
        ); 

    app.put('/livros', livroControlador.edita())
    app.delete('/livros/:id', livroControlador.remove())

    };