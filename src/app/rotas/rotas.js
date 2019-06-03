const { check, validationResult } = require('express-validator/check');

const BaseControlador = require('../controladores/base-controlador')
const baseControlador = new BaseControlador()

const LivroControlador = require( '../controladores/livro-controlador.js')
const livroControlador = new LivroControlador() 

module.exports = ( app ) => {

    const rotasBase = BaseControlador.rotas(); 
    const rotasLivro = LivroControlador.rotas(); 


    app.get( rotasBase.home, baseControlador.home())
   
    app.get(rotasLivro.lista, livroControlador.lista() ); 

    app.get(rotasLivro.cadastro, livroControlador.formularioCadastro() );

    app.get(rotasLivro.edicao, livroControlador.formularioEdicao() ) ;
    

    //express-validator 
    app.post(rotasLivro.lista, [ 
        
        check( 'titulo' ).isLength({ min: 5 }).withMessage('O titulo precisa ter no minimo 5 caracteres!'), 
        check( 'preco' ).isCurrency().withMessage( 'o preco precisar ter um valor monetario valido! ')

         ], 

            livroControlador.cadastra()
        ); 

    app.put(rotasLivro.lista, livroControlador.edita())
    
    app.delete(rotasLivro.delecao, livroControlador.remove())

    };