const joi = require('joi')

const produtoSchema = joi.object({
    descricao: joi.string().trim().required().messages({
        'string.empty': 'O campo descrição é obrigatório',
        'any.required': 'O campo descrição é obrigatório',
        'string.base': 'Informe uma descrição válida.'
    }),
    quantidade_estoque: joi.number().greater(0).integer().positive().required().messages({
        'any.required': 'O campo quantidade_estoque é obrigatório',
        'number.greater': 'Informe um número, acima de 0, no campo quantidade_estoque.',
        'number.base': 'Informe um número, acima de 0, no campo quantidade_estoque.',
        'number.positive': 'Informe um valor positivo no campo quantidade_estoque.'
    }),
    valor: joi.number().greater(0).integer().positive().required().messages({
        'any.required': 'O campo valor é obrigatório.',
        'number.greater': 'Informe um número, acima de 0, no campo valor.',
        'number.base': 'Informe um número, acima de 0, no campo valor.',
        'number.positive': 'Informe um valor positivo no campo valor.'
    }),
    categoria_id: joi.number().greater(0).integer().positive().required().messages({
        'any.required': 'O campo categoria_id é obrigatório.',
        'number.greater': 'Informe um número, acima de 0, no campo categoria_id.',
        'number.base': 'Informe um número, acima de 0, no campo categoria_id.',
        'number.positive': 'Informe um valor positivo no campo categoria_id.'
    })

});

module.exports = produtoSchema