const joi = require('joi');

const loginSchema = joi.object({
    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório.',
        'string.empty': 'O campo email é obrigatório.',
        'string.email': 'Informe um email válido.',
        'string.base': 'Informe um email válido.'
    }),

    senha: joi.string().min(5).max(20).required().messages({
        'any.required': 'O campo senha é obrigatório.',
        'string.empty': 'O campo senha é obrigatório.',
        'string.base': 'Informe uma senha válido.',
        'string.min': 'A senha deve ter no mínimo 5 caracteres.',
        'string.max': 'A senha deve ter no máximo 10 caracteres.'
    })
});

module.exports = loginSchema; 