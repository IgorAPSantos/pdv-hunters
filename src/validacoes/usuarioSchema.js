const joi = require('joi')

const usuarioSchema = joi.object({ 
    nome: joi.string().trim().min(3).max(100).pattern(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/
    ).messages({
        'string.empty': 'O campo nome é obrigatório',
        'any.required': 'O campo nome é obrigatório',
        'string.base': 'Informe um nome válido.',
        'string.min': 'O nome deve ter no mínimo 3 caracteres.',
        'string.max': 'O nome deve ter no máximo 100 caracteres.',
        'string.pattern.base': 'Informe um nome válido.'
    }),
    email: joi.string().email().required().messages({
        'string.empty': 'O campo email é obrigatório',
        'any.required': 'O campo email é obrigatório',
        'string.email': 'Informe um email válido.',
        'string.base': 'Informe um email válido.'
    }),
    senha: joi.string().min(5).max(10).required().messages({
        'any.required': 'O campo senha é obrigatório.',
        'string.empty': 'O campo senha é obrigatório.',
        'string.base': 'Informe uma senha válido.',
        'string.min': 'A senha deve ter no mínimo 5 caracteres.',
        'string.max': 'A senha deve ter no máximo 10 caracteres.'
    })

});

module.exports = usuarioSchema