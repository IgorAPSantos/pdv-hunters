const knex = require('../conexoes/bancodedados')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const loginUsuario = async (req, res) => {
    const {email, senha} = req.body;
    
    try {
        const usuario = await knex('usuarios').where({ email }).first()
        
        if(!usuario){
            return res.status(400).json({
                mensagem: 'Email ou senha inválido.'
            })
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if(!senhaValida){
            return res.status(400).json({
                mensagem: 'Email ou senha inválido.'
            })
        }

        const token = jwt.sign({id: usuario.id}, process.env.JWT_SENHA, {expiresIn: '8h'})

        const {senha: _, ...usuarioLogado} = usuario

        return res.json({
            usuario: usuarioLogado, token
        })
    } catch (error) {
        console.log(error)
        return res.status(500)
        .json({
            mensagem: 'Erro interno do servidor.'
        })
        
    }
};

module.exports = loginUsuario;