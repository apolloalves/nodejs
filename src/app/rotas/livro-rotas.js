
const LivroControlador = require( '../controladores/livro-controlador.js')
const livroControlador = new LivroControlador() 

const Livro = require('../modelos/Livro')

module.exports = ( app ) => {

    const rotasLivro = LivroControlador.rotas(); 
   
    app.get(rotasLivro.lista, livroControlador.lista()); 

    app.route( rotasLivro.cadastro )
        .get( livroControlador.formularioCadastro() )
        .post( Livro.validacoes(), livroControlador.cadastra() )
        .put( livroControlador.edita() )

    app.get(rotasLivro.edicao, livroControlador.formularioEdicao());
    app.delete(rotasLivro.delecao, livroControlador.remove());

    };

