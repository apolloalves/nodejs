const { check, validationResult } = require('express-validator/check');

class Livro {
	static validacoes() {
		return   [ 
        
        check( 'titulo' ).isLength({ min: 5 }).withMessage('O titulo precisa ter no minimo 5 caracteres!'), 
        check( 'preco' ).isCurrency().withMessage( 'o preco precisar ter um valor monetario valido! ')

         ] 
	}

}


module.exports = Livro; 