const jwt = require("jsonwebtoken");
const knex = require('../conexoes/bancodedados')

const verificarUsuarioLogado = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            mensagem: 'Usuário não autenticado'
        })
    }

    const token = authorization.split(' ')[1];

    try {

        const { id } = jwt.verify(token, process.env.JWT_SENHA)

        const usuario = await knex('usuarios').select('*').where({ id }).first()


        if (!usuario) {
            return res.status(404).json({
                mensagem: 'Usuário não autenticado.'
            })
        }

        const { senha: _, ...usuarioAutenticado } = usuario

        req.usuario = usuarioAutenticado

        next()

    } catch (error) {
        return res.status(401).json({
            mensagem: 'Usuário não autenticado'
        })
    }
};

module.exports = verificarUsuarioLogado;