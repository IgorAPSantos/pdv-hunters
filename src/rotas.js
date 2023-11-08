const express = require('express')
const rota = express()

const { listarCategorias } = require('./controladores/categorias')
const { cadastrarUsuario, detalharPerfilUsuarioLogado, editarUsuario, } = require('./controladores/usuarios')
const validarRequisicao = require('./intermediarios/validarRequisicao')
const usuarioSchema = require('./validacoes/usuarioSchema')
const loginSchema = require('./validacoes/loginSchema')
const loginUsuario = require('./controladores/login')
const verificarUsuarioLogado = require('./intermediarios/validarUsuarioLogado')

rota.post('/usuario', validarRequisicao(usuarioSchema), cadastrarUsuario)
rota.post('/login', validarRequisicao(loginSchema), loginUsuario)

rota.use(verificarUsuarioLogado)
rota.get('/categoria', listarCategorias)
rota.get('/usuario', detalharPerfilUsuarioLogado)
rota.put('/usuario', validarRequisicao(usuarioSchema), editarUsuario)

module.exports = rota
