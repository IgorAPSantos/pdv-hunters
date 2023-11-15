const joi = require("joi")


const enderecoClienteSchema = joi.object({
    cep: joi.string().pattern(new RegExp('^[0-9]{8}$')).messages({
        'string.pattern.base': 'Informe um cep válido.',
        'string.base': 'Informe um cep válido.',
        'string.empty': 'Informe um cep válido.'
    }),
    rua: joi.string().trim().max(140).messages({
        'string.base': 'Informe uma rua válida.',
        'string.empty': 'Informe uma rua válida.',
        'string.max': 'Informe uma rua válida.'
    }),
    numero: joi.string().max(5).pattern(new RegExp(/^\d+[a-zA-Z]*$/)).messages({
        'string.base': 'Informe um numero válido.',
        'string.empty': 'Informe um numero válido.',
        'string.max': 'Informe um numero válido.',
        "string.pattern.base": 'Informe um numero válido.'

    }),
    bairro: joi.string().trim().max(140).messages({
        'string.base': 'Informe um bairro válido.',
        'string.empty': 'Informe um bairro válido.',
        'string.max': 'Informe um bairro válido.'
    }),
    cidade: joi.string().trim().max(140).messages({
        'string.base': 'Informe uma cidade válida.',
        'string.empty': 'Informe uma cidade válida.',
        'string.max': 'Informe uma cidade válida.'
    }),
    estado: joi.string().trim().max(2).messages({
        'string.base': 'Informe um estado válido.',
        'string.empty': 'Informe um estado válido.',
        'string.max': 'Informe um estado válido.'
    })
})

module.exports = enderecoClienteSchema